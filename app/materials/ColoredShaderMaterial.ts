import {
    FRAGMENT_SHADER_BEGIN,
    FRAGMENT_SHADER_MAIN_BEGIN,
    FRAGMENT_SHADER_MAIN_END,
    VERTEX_SHADER_BEGIN,
    VERTEX_SHADER_MAIN_BEGIN,
    VERTEX_SHADER_MAIN_END,
} from 'sky/shaders'
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
        ${VERTEX_SHADER_BEGIN}

        varying vec3 vViewPosition;
        varying vec2 vUv;

        void main() {
            ${VERTEX_SHADER_MAIN_BEGIN}

            vUv = uv;
            vViewPosition = - mvPosition.xyz;

            ${VERTEX_SHADER_MAIN_END}
        }
    `
}

function fragmentShader(): string {
    return `
       ${FRAGMENT_SHADER_BEGIN}

        varying vec2 vUv;
        uniform sampler2D map;

        void main() {
            ${FRAGMENT_SHADER_MAIN_BEGIN}

            vec4 textureColor = texture2D(map, vUv);

            vec3 color = vec3(1.0, 1.0, 1.0);
            vec3 extraColor = vec3(0.5, 0.5, 0.5);
            vec3 lightColor = vec3(0.2, 0.2, 0.2);
            
            diffuseColor.r = color.r * textureColor.r + extraColor.r * textureColor.g + lightColor.r * textureColor.b;
            diffuseColor.g = color.g * textureColor.r + extraColor.g * textureColor.g + lightColor.g * textureColor.b;
            diffuseColor.b = color.b * textureColor.r + extraColor.b * textureColor.g + lightColor.b * textureColor.b;
            diffuseColor.a = textureColor.a;

            ${FRAGMENT_SHADER_MAIN_END}
        }
    `
}
