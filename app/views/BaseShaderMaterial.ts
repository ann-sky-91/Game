import { ShaderMaterial } from 'three/src/materials/Materials'
import { ShaderLib } from 'three/src/renderers/shaders/ShaderLib'
import { UniformsLib } from 'three/src/renderers/shaders/UniformsLib'
import { mergeUniforms } from 'three/src/renderers/shaders/UniformsUtils'
import { Texture } from 'three/src/textures/Texture'

export interface BaseShaderMaterialOptions {
    texture: Texture
}
export default function BaseShaderMaterial(options: BaseShaderMaterialOptions): ShaderMaterial {
    const uniforms = {
        texture1: { type: 't', value: options.texture },
    }

    return new ShaderMaterial({
        vertexShader: vertexShader(),
        fragmentShader: fragmentShader(),
        defines: {
            MAP_UV: '',
            USE_UV: '',
            USE_MAP: '',
            USE_LIGHTS: '',
            USE_SHADOW: '',
        },
        uniforms: mergeUniforms([ShaderLib.phong.uniforms, UniformsLib.fog, uniforms]),
        lights: true,
        transparent: true,
    })
}

function vertexShader(): string {
    return `
        varying vec2 vUv;

        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `
}

function fragmentShader(): string {
    return `
        uniform vec3 ambientLightColor;
        uniform sampler2D texture1;
        varying vec2 vUv;

        void main() {
            vec4 textureColor = texture2D(texture1, vUv);
            gl_FragColor = vec4(ambientLightColor, 1.0) * textureColor;
        }
    `
}
