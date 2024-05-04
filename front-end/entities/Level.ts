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
    static CELL_SIZE = 2

    readonly w: number
    readonly h: number

    constructor(deps: EffectDeps, level: LevelSave) {
        super(deps)

        this.w = level.width * Level.CELL_SIZE
        this.h = level.height * Level.CELL_SIZE

        const dictionary = getLevelDictionary(level)

        for (let i = 0; i < 6; ++i) {
            const heights = level.layers[i * 3 + 1]
            const ground = level.layers[i * 3]
            const grid = []

            for (let y = 0; y < level.height; ++y) {
                for (let x = 0; x < level.width; ++x) {
                    const i = y * level.width + x
                    const index = ground.data[i]
                    const slug = dictionary[index]

                    if (!slug) {
                        continue
                    }

                    const hIndex = heights.data[i]
                    const hSlug = dictionary[hIndex]

                    const h = hSlug ? Number(hSlug.slice(-1)) : 0

                    grid[x] = grid[x] || []
                    grid[x][y] = [slug, h]

                    new Cell(slug, level.width - x, y, h, this)
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
