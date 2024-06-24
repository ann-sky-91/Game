import { PlaneGeometry } from 'three/src/geometries/PlaneGeometry'
import { Color } from 'three/src/math/Color'
import { Mesh } from 'three/src/objects/Mesh'
import { Texture } from 'three/src/textures/Texture'

import ColoredShaderMaterial from '../materials/ColoredShaderMaterial'

export interface ColoredSpriteViewOptions {
    map: Texture
    w: number
    h: number
}
export default class ColoredSpriteView extends Mesh {
    material: ColoredShaderMaterial
    color: Color
    extraColor: Color
    lightCOlor: Color

    constructor(options: ColoredSpriteViewOptions) {
        const plane = new PlaneGeometry(options.w, options.h, 1, 1)
        const material = new ColoredShaderMaterial({ map: options.map })
        super(plane, material)
    }

    onAnimationFrame(): void {
        this.material.uniforms.color = { value: this.color }
        this.material.uniforms.extraColor = { value: this.extraColor }
        this.material.uniforms.lightCOlor = { value: this.lightCOlor }
    }
}
