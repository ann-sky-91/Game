import { Object3D } from 'three/src/core/Object3D'

import Cell from './Cell'

export interface LevelSave {
    width: number
    height: number

    layers: {
        data: number[]
    }[]

    tilesets: {
        [x: string]: {
            firstgid: number

            tiles: {
                image: string
            }[]
        }
    }
}

export interface LevelDictionary {
    [x: number]: string
}

@entity
export default class Level extends Entity {
    readonly w: number
    readonly h: number

    readonly levels: Object3D[] = []

    constructor(deps: EffectDeps, level: LevelSave) {
        super(deps)

        this.w = level.width
        this.h = level.height

        const dictionary = getLevelDictionary(level)

        for (let i = 2; i < 3; ++i) {
            const layerIndex = i
            const heights = level.layers[i * 3 + 1]
            const ground = level.layers[i * 3]

            for (let y = 0; y < level.height; ++y) {
                for (let x = 0; x < level.width; ++x) {
                    const dataIndex = y * level.width + x
                    const index = ground.data[dataIndex]
                    const slug = dictionary[index]

                    if (!slug) {
                        continue
                    }

                    const hIndex = heights.data[dataIndex]
                    const hSlug = dictionary[hIndex]

                    const z = layerIndex - 2
                    const h = hSlug ? Number(hSlug.slice(-1)) / 6 : 0

                    new Cell(slug, level.width - x, y, z * 2.0001, h * 2, this)
                }
            }
        }
    }
}

export function getLevelDictionary(level: LevelSave): LevelDictionary {
    const prefix = '../../../_editor-assets/'

    const tilesets = level.tilesets
    const dictionary = {}
    for (const k in tilesets) {
        const set = tilesets[k]
        const firstgid = set.firstgid
        for (const k in set.tiles) {
            const tile = set.tiles[k]
            const id = firstgid + parseInt(k)
            let slug = tile.image.slice(prefix.length, -4)
            slug = slug.slice(slug.indexOf('/') + 1)
            dictionary[id] = slug
        }
    }

    return dictionary
}
