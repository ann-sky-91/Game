import TiledBoxGeometry from 'sky/geometries/TiledBoxGeometry'
import TiledPlaneGeometry from 'sky/geometries/TiledPlaneGeometry'
import { BufferAttribute } from 'three/src/core/BufferAttribute'
import { BufferGeometry } from 'three/src/core/BufferGeometry'
import { Mesh } from 'three/src/objects/Mesh'

import BaseShaderMaterial from '../materials/BaseShaderMaterial'

import { CellsInfo } from '@/entities/Cells'

export default class CellsView extends Mesh {
    constructor(cells: CellsInfo) {
        const sumPosArr = new Float32Array(cells.length * 3)
        const sumNormArr = new Float32Array(cells.length * 3)
        const sumUvArr = new Float32Array(cells.length * 2)

        let sumPosCursor = 0
        let sumNormCursor = 0
        let sumUvCursor = 0

        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i]
            let geometry: TiledPlaneGeometry | TiledBoxGeometry

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
                    height: cell.h,
                })
            }

            const posAttArr = geometry.getAttribute('position').array

            for (let j = 0; j < posAttArr.length; j++) {
                sumPosArr[j + sumPosCursor] = posAttArr[j]
            }

            sumPosCursor += posAttArr.length

            const numAttArr = geometry.getAttribute('normal').array

            for (let j = 0; j < numAttArr.length; j++) {
                sumNormArr[j + sumNormCursor] = numAttArr[j]
            }

            sumNormCursor += numAttArr.length

            const uvAttArr = geometry.getAttribute('uv').array

            for (let j = 0; j < uvAttArr.length; j++) {
                sumUvArr[j + sumUvCursor] = uvAttArr[j]
            }

            sumUvCursor += uvAttArr.length
        }

        const geometry = new BufferGeometry()
        geometry.setAttribute('position', new BufferAttribute(sumPosArr, 3))
        geometry.setAttribute('normal', new BufferAttribute(sumNormArr, 3))
        geometry.setAttribute('uv', new BufferAttribute(sumUvArr, 2))

        const type = cells[0].slug
        const textureOptions = assetsManager.getTextureOptions(`level/${type}`)
        const material = new BaseShaderMaterial({ map: textureOptions.texture })

        super(geometry, material)
    }
}
