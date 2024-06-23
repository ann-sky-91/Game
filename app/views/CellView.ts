import TiledBoxView from 'sky/views/TiledBoxView'

import BaseShaderMaterial from './BaseShaderMaterial'

export interface CellViewOptions {
    type: string
    x: number
    y: number
    z: number
    h: number
}
export default class CellView extends TiledBoxView {
    constructor(options: CellViewOptions) {
        const { type, x, y, z, h } = options

        const textureOptions = assetsManager.getTextureOptions(`level/${type}`)
        const material = new BaseShaderMaterial({ map: textureOptions.texture })

        super({
            material,
            mapFactor: textureOptions.factor,
            x,
            y,
            z,
            width: 1,
            depth: 1,
            height: h,
        })
    }
}
