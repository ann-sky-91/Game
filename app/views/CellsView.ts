import TiledBoxGeometry from 'sky/geometries/TiledBoxGeometry'
import TiledPlaneGeometry from 'sky/geometries/TiledPlaneGeometry'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils'
import { BufferAttribute } from 'three/src/core/BufferAttribute'
import { BufferGeometry } from 'three/src/core/BufferGeometry'
import { Mesh } from 'three/src/objects/Mesh'

import BaseShaderMaterial from '../materials/BaseShaderMaterial'

import { CellsInfo } from '@/entities/Cells'

export default class CellsView extends Mesh {
    constructor(cells: CellsInfo) {
        const geometries: (TiledPlaneGeometry | TiledBoxGeometry)[] = []

        cells.forEach(cell => {
            let geometry
            if (cell.h === 0) {
                geometry = new TiledPlaneGeometry({
                    ...cell,
                    width: 1,
                    depth: 1,
                })
            } else {
                geometry = new TiledBoxGeometry({
                    ...cell,
                    width: 1,
                    depth: 1,
                    height: 1,
                })
            }
            geometries.push(geometry)
        })

        const geometry = BufferGeometryUtils.mergeGeometries(geometries)
        const type = cells[0].slug
        const textureOptions = assetsManager.getTextureOptions(`level/${type}`)
        const material = new BaseShaderMaterial({ map: textureOptions.texture })

        super(geometry, material)
    }
}
