import { PlaneGeometry } from 'three/src/geometries/PlaneGeometry'
import { ShaderMaterial } from 'three/src/materials/Materials'
import { Color } from 'three/src/math/Color'
import { Mesh } from 'three/src/objects/Mesh'
import { Texture } from 'three/src/textures/Texture'

export interface ColoredSpriteViewOptions {
    texture: Texture
    w: number
    h: number
}
export default function ColoredSpriteView(options: ColoredSpriteViewOptions): Mesh {
    const plane = new PlaneGeometry(options.w, options.h, 1, 1)
    const uniforms = {
        colorB: { type: 'vec3', value: new Color(0xacb6e5) },
        colorA: { type: 'vec3', value: new Color(0x74ebd5) },
    }
    const material = new ShaderMaterial({
        uniforms: uniforms,
        fragmentShader: fragmentShader(),
        vertexShader: vertexShader(),
    })
    const mesh = new Mesh(plane, material)

    return mesh
}

function vertexShader(): string {
    return `
        varying vec3 vUv; 
    
        void main() {
            vUv = position; 
    
            vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * modelViewPosition; 
        }
    `
}

function fragmentShader(): string {
    return `
        uniform vec3 colorA; 
        uniform vec3 colorB; 
        varying vec3 vUv;

        void main() {
            gl_FragColor = vec4(mix(colorA, colorB, vUv.x), 1.0);
        }
    `
}
