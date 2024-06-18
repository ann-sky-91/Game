import { PlaneGeometry } from 'three/src/geometries/PlaneGeometry'
import { Mesh } from 'three/src/objects/Mesh'
import { Texture } from 'three/src/textures/Texture'

import ColoredShaderMaterial from './ColoredShaderMaterial'

export interface ColoredSpriteViewOptions {
    map: Texture
    w: number
    h: number
}
export default function ColoredSpriteView(options: ColoredSpriteViewOptions): Mesh {
    const plane = new PlaneGeometry(options.w, options.h, 1, 1)
    const material = ColoredShaderMaterial({ map: options.map })
    const mesh = new Mesh(plane, material)
    return mesh
}
