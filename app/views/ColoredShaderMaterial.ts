import { ShaderMaterial } from 'three/src/materials/Materials'
import { ShaderLib } from 'three/src/renderers/shaders/ShaderLib'
import { UniformsLib } from 'three/src/renderers/shaders/UniformsLib'
import { mergeUniforms } from 'three/src/renderers/shaders/UniformsUtils'
import { Texture } from 'three/src/textures/Texture'

export interface ColoredShaderMaterialOptions {
    map: Texture
}
export default class ColoredShaderMaterial extends ShaderMaterial {
    constructor(options: ColoredShaderMaterialOptions) {
        const uniforms = {
            map: { type: 't', value: options.map },
        }

        super({
            vertexShader: vertexShader(),
            fragmentShader: fragmentShader(),
            uniforms: mergeUniforms([ShaderLib.phong.uniforms, UniformsLib.fog, uniforms]),
            lights: true,
            transparent: true,
        })
    }
}

function vertexShader(): string {
    return `
        #define PHONG

        varying vec3 vViewPosition;
        varying vec2 vUv;

        #include <common>
        #include <batching_pars_vertex>
        #include <uv_pars_vertex>
        #include <displacementmap_pars_vertex>
        #include <envmap_pars_vertex>
        #include <color_pars_vertex>
        #include <fog_pars_vertex>
        #include <normal_pars_vertex>
        #include <morphtarget_pars_vertex>
        #include <skinning_pars_vertex>
        #include <shadowmap_pars_vertex>
        #include <logdepthbuf_pars_vertex>
        #include <clipping_planes_pars_vertex>

        void main() {
            #include <uv_vertex>
            #include <color_vertex>
            #include <morphcolor_vertex>
            #include <batching_vertex>

            #include <beginnormal_vertex>
            #include <morphinstance_vertex>
            #include <morphnormal_vertex>
            #include <skinbase_vertex>
            #include <skinnormal_vertex>
            #include <defaultnormal_vertex>
            #include <normal_vertex>

            #include <begin_vertex>
            #include <morphtarget_vertex>
            #include <skinning_vertex>
            #include <displacementmap_vertex>
            #include <project_vertex>
            #include <logdepthbuf_vertex>
            #include <clipping_planes_vertex>

            vUv = uv;
            vViewPosition = - mvPosition.xyz;

            #include <worldpos_vertex>
            #include <envmap_vertex>
            #include <shadowmap_vertex>
            #include <fog_vertex>
        }
    `
}

function fragmentShader(): string {
    return `
        #define PHONG

        uniform vec3 diffuse;
        uniform vec3 emissive;
        uniform vec3 specular;
        uniform float shininess;
        uniform float opacity;

        #include <common>
        #include <packing>
        #include <dithering_pars_fragment>
        #include <color_pars_fragment>
        #include <uv_pars_fragment>
        #include <map_pars_fragment>
        #include <alphamap_pars_fragment>
        #include <alphatest_pars_fragment>
        #include <alphahash_pars_fragment>
        #include <aomap_pars_fragment>
        #include <lightmap_pars_fragment>
        #include <emissivemap_pars_fragment>
        #include <envmap_common_pars_fragment>
        #include <envmap_pars_fragment>
        #include <fog_pars_fragment>
        #include <bsdfs>
        #include <lights_pars_begin>
        #include <normal_pars_fragment>
        #include <lights_phong_pars_fragment>
        #include <shadowmap_pars_fragment>
        #include <shadowmask_pars_fragment>
        #include <bumpmap_pars_fragment>
        #include <normalmap_pars_fragment>
        #include <specularmap_pars_fragment>
        #include <logdepthbuf_pars_fragment>
        #include <clipping_planes_pars_fragment>

        varying vec2 vUv;
        uniform sampler2D map;

        void main() {
            // shadow map
            DirectionalLightShadow directionalShadow = directionalLightShadows[0];

            float shadow = getShadow(
                directionalShadowMap[0],
                directionalShadow.shadowMapSize,
                directionalShadow.shadowBias,
                directionalShadow.shadowRadius,
                vDirectionalShadowCoord[0]
            );

            vec4 textureColor = texture2D(map, vUv);
            vec3 col = textureColor.rgb * shadow;
            vec4 diffuseColor;
            diffuseColor.r = textureColor.r;
            diffuseColor.g = textureColor.r;
            diffuseColor.b = textureColor.r;
            diffuseColor.a = textureColor.r * textureColor.a;


            #include <clipping_planes_fragment>

            ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
            vec3 totalEmissiveRadiance = emissive;

            #include <logdepthbuf_fragment>
            #include <map_fragment>
            #include <color_fragment>
            #include <alphamap_fragment>
            #include <alphatest_fragment>
            #include <alphahash_fragment>
            #include <specularmap_fragment>
            #include <normal_fragment_begin>
            #include <normal_fragment_maps>
            #include <emissivemap_fragment>

            // accumulation
            #include <lights_phong_fragment>
            #include <lights_fragment_begin>
            #include <lights_fragment_maps>
            #include <lights_fragment_end>

            // modulation
            #include <aomap_fragment>

            vec3 outgoingLight =
                reflectedLight.directDiffuse +
                reflectedLight.indirectDiffuse +
                reflectedLight.directSpecular +
                reflectedLight.indirectSpecular +
                totalEmissiveRadiance;

            #include <envmap_fragment>
            #include <opaque_fragment>
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
            #include <fog_fragment>
            #include <premultiplied_alpha_fragment>
            #include <dithering_fragment>
        }
    `
}
