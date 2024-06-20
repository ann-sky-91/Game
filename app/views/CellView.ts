import TiledBoxView from 'sky/views/TiledBoxView'
import { Mesh } from 'three/src/objects/Mesh'

import BaseShaderMaterial from './BaseShaderMaterial'

export interface CellViewOptions {
    type: string
    x: number
    y: number
    z: number
    h: number
}
export default function CellView(options: CellViewOptions): Mesh {
    const { type, x, y, z, h } = options

    const textureOptions = assetsManager.getTextureOptions(`level/${type}`)
    const material = BaseShaderMaterial({ map: textureOptions.texture })

    const view = TiledBoxView({
        material,
        mapFactor: textureOptions.factor,
        x,
        y,
        z,
        width: 1,
        depth: 1,
        height: h,
    })

    return view
}
