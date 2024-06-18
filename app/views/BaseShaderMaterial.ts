import { ShaderMaterial } from 'three/src/materials/Materials'
import { ShaderLib } from 'three/src/renderers/shaders/ShaderLib'
import { UniformsLib } from 'three/src/renderers/shaders/UniformsLib'
import { mergeUniforms } from 'three/src/renderers/shaders/UniformsUtils'
import { Texture } from 'three/src/textures/Texture'

export interface BaseShaderMaterialOptions {
    map: Texture
}
export default function BaseShaderMaterial(options: BaseShaderMaterialOptions): ShaderMaterial {
    const uniforms = {
        texture1: { type: 't', value: options.map },
    }

    return new ShaderMaterial({
        vertexShader: vertexShader(),
        fragmentShader: fragmentShader(),
        uniforms: mergeUniforms([ShaderLib.phong.uniforms, UniformsLib.fog, uniforms]),
        lights: true,
        transparent: true,
    })
}

function vertexShader(): string {
    return `
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec2 vUv;

        void main() {
            vPosition = position;
            vNormal = normal;
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `
}

function fragmentShader(): string {
    return `
        uniform vec3 ambientLightColor;
        uniform sampler2D texture1;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec2 vUv;

        #define MAX_POINT_LIGHTS 4
        uniform vec3 pointLightColor[MAX_POINT_LIGHTS];
        uniform vec3 pointLightPosition[MAX_POINT_LIGHTS];
        uniform float pointLightDistance[MAX_POINT_LIGHTS];

        void main() {
            vec4 lights = vec4(0.0, 0.0, 0.0, 1.0);
            for(int i = 0; i < MAX_POINT_LIGHTS; i++) {
                vec3 lightVector = normalize(vPosition - pointLightPosition[i]);
                lights.rgb += clamp(dot(-lightVector, vNormal), 0.0, 1.0) * pointLightColor[i];
            }

            vec4 textureColor = texture2D(texture1, vUv);
            gl_FragColor = textureColor * lights;
        }
    `
}
