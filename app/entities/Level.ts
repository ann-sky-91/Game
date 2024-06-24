import { Object3D } from 'three/src/core/Object3D'

import Cells from './Cells'

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

            type GridValue = {
                x: number
                y: number
                z: number
                h: number
                slug: string
            }

            const grid: GridValue[][] = []

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

                    grid[x] ??= []
                    grid[x][y] = {
                        x: level.width - x,
                        y,
                        z: z * 2.001,
                        h: h * 2,
                        slug,
                    }
                }
            }

            const handleCell = (x: number, y: number, values: GridValue[] = []): GridValue[] => {
                const value = grid[x][y]
                values.push(value)
                grid[x][y] = null

                if (grid[x + 1] && grid[x + 1][y] && grid[x + 1][y].slug === value.slug) {
                    handleCell(x + 1, y, values)
                }
                if (grid[x - 1] && grid[x - 1][y] && grid[x - 1][y].slug === value.slug) {
                    handleCell(x - 1, y, values)
                }
                if (grid[x] && grid[x][y + 1] && grid[x][y + 1].slug === value.slug) {
                    handleCell(x, y + 1, values)
                }
                if (grid[x] && grid[x][y - 1] && grid[x][y - 1].slug === value.slug) {
                    handleCell(x, y - 1, values)
                }

                return values
            }

            for (let y = 0; y < level.height; ++y) {
                for (let x = 0; x < level.width; ++x) {
                    if (grid[x] && grid[x][y]) {
                        const values = handleCell(x, y)
                        new Cells(values, this)
                    }
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
