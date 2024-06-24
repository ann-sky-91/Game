import TiledBoxGeometry from 'sky/geometries/TiledBoxGeometry'
import TiledPlaneGeometry from 'sky/geometries/TiledPlaneGeometry'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils'
import { Mesh } from 'three/src/objects/Mesh'

import BaseShaderMaterial from '../materials/BaseShaderMaterial'

import { CellsInfo } from '@/entities/Cells'

export default class CellsView extends Mesh {
    constructor(cells: CellsInfo) {
        const type = cells[0].slug
        const textureOptions = assetsManager.getTextureOptions(`level/${type}`)

        const geometries: (TiledPlaneGeometry | TiledBoxGeometry)[] = []

        const x = cells[0].x - 0.5
        const y = cells[0].y - 0.5
        const z = cells[0].z - cells[0].h / 2
        let minX = x
        let minY = y
        let minZ = z
        let maxX = x + 1
        let maxY = y + 1
        let maxZ = z + cells[0].h

        cells.forEach(cell => {
            minX = Math.min(minX, cell.x - 0.5)
            minY = Math.min(minY, cell.y - 0.5)
            minZ = Math.min(minZ, cell.z - cell.h / 2)
            maxX = Math.max(maxX, cell.x + 0.5)
            maxY = Math.max(maxY, cell.y + 0.5)
            maxZ = Math.max(maxZ, cell.z + cell.h / 2)
            let geometry: TiledPlaneGeometry | TiledBoxGeometry
            if (cell.h === 0) {
                geometry = new TiledPlaneGeometry({
                    ...cell,
                    width: 1,
                    depth: 1,
                    mapFactor: textureOptions.factor,
                })
            } else {
                geometry = new TiledBoxGeometry({
                    ...cell,
                    width: 1,
                    depth: 1,
                    height: cell.h,
                    mapFactor: textureOptions.factor,
                })
            }
            geometry.translate(cell.x + 0.5 - x, cell.y + 0.5 - y, cell.z + cell.h / 2 - z)
            geometries.push(geometry)
        })

        const geometry = BufferGeometryUtils.mergeGeometries(geometries)
        const material = new BaseShaderMaterial({ map: textureOptions.texture })

        super(geometry, material)

        this.position.x = x
        this.position.y = y
        this.position.z = z
    }
}
