import { DoubleSide } from 'three/src/constants'
import { PlaneGeometry } from 'three/src/geometries/PlaneGeometry'
import { ShaderMaterial, MeshPhysicalMaterial } from 'three/src/materials/Materials'
import { Color } from 'three/src/math/Color'
import { Mesh } from 'three/src/objects/Mesh'
import { ShaderLib } from 'three/src/renderers/shaders/ShaderLib'
import { UniformsLib } from 'three/src/renderers/shaders/UniformsLib'
import { UniformsUtils, mergeUniforms } from 'three/src/renderers/shaders/UniformsUtils'
import { Texture } from 'three/src/textures/Texture'

export interface ColoredSpriteViewOptions {
    texture: Texture
    w: number
    h: number
}
export default function ColoredSpriteView(options: ColoredSpriteViewOptions): Mesh {
    const plane = new PlaneGeometry(options.w, options.h, 1, 1)
    const uniforms = {
        texture1: { type: 't', value: options.texture },
    }
    const material = new ShaderMaterial({
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
    })
    const mesh = new Mesh(plane, material)

    return mesh
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
