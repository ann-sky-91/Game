import { BoxGeometry } from 'three/src/geometries/BoxGeometry'
import { PlaneGeometry } from 'three/src/geometries/PlaneGeometry'
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

    const material = BaseShaderMaterial({ map: assetsManager.getTexture(`level/${type}`) })

    let mesh: Mesh
    if (h === 0) {
        mesh = new Mesh(new PlaneGeometry(1, 1, 1, 1), material)
    } else {
        mesh = new Mesh(new BoxGeometry(1, 1, h, 1, 1, 1), material)
    }

    mesh.castShadow = true
    mesh.receiveShadow = true

    const uvAttribute = mesh.geometry.attributes.uv
    for (let i = 0; i < uvAttribute.count; i++) {
        const u = uvAttribute.getX(i)
        const v = uvAttribute.getY(i)
        // console.log(i, u, v)
        uvAttribute.setXY(i, u, v)
        // TODO
    }

    mesh.position.x = x
    mesh.position.y = y
    mesh.position.z = z + h / 2

    return mesh
}
