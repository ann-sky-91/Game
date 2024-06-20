import { RepeatWrapping } from 'three/src/constants'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Texture } from 'three/src/textures/Texture'

namespace AssetsManager {
    export interface TextureOptions {
        texture: Texture
        factor?: number
        wrapX?: boolean
        wrapY?: boolean
    }
    export interface LoadTextureOptions {
        factor?: number
        wrapX?: boolean
        wrapY?: boolean
    }
}
class AssetsManager {
    readonly textureLoader: TextureLoader
    progress: number = 1

    constructor() {
        this.textureLoader = new TextureLoader()
    }

    async loadPlayerTextures(): Promise<void> {
        await Promise.all([this.loadTexture('player/player')])
    }

    async loadLevelTextures(): Promise<void> {
        await Promise.all([
            this.loadTexture('level/bricks', {
                wrapX: true,
                wrapY: true,
                factor: 0.5,
            }),
            this.loadTexture('level/bricks2', {
                wrapX: true,
                wrapY: true,
                factor: 0.4,
            }),
            this.loadTexture('level/deep-water', {
                wrapX: true,
                wrapY: true,
                factor: 0.25,
            }),
            this.loadTexture('level/dirt', {
                wrapX: true,
                wrapY: true,
                factor: 0.25,
            }),
            this.loadTexture('level/dirt2', {
                wrapX: true,
                wrapY: true,
                factor: 0.25,
            }),
            this.loadTexture('level/door', {
                wrapX: true,
                wrapY: true,
                factor: 0.25,
            }),
            this.loadTexture('level/forest-ground', {
                wrapX: true,
                wrapY: true,
                factor: 0.25,
            }),
            this.loadTexture('level/grass', {
                wrapX: true,
                wrapY: true,
                factor: 0.4,
            }),
            this.loadTexture('level/grass2', {
                wrapX: true,
                wrapY: true,
                factor: 0.5,
            }),
            this.loadTexture('level/ground', {
                wrapX: true,
                wrapY: true,
                factor: 0.25,
            }),
            this.loadTexture('level/ice', {
                wrapX: true,
                wrapY: true,
                factor: 0.25,
            }),
            this.loadTexture('level/lava', {
                wrapX: true,
                wrapY: true,
                factor: 0.2,
            }),
            this.loadTexture('level/leaves', {
                wrapX: true,
                wrapY: true,
                factor: 0.6,
            }),
            this.loadTexture('level/leaves2', {
                wrapX: true,
                wrapY: true,
                factor: 0.6,
            }),
            this.loadTexture('level/leaves3', {
                wrapX: true,
                wrapY: true,
                factor: 0.6,
            }),
            this.loadTexture('level/leaves4', {
                wrapX: true,
                wrapY: true,
                factor: 0.6,
            }),
            this.loadTexture('level/leaves5', {
                wrapX: true,
                wrapY: true,
                factor: 0.6,
            }),
            this.loadTexture('level/sand', {
                wrapX: true,
                wrapY: true,
                factor: 0.6,
            }),
            this.loadTexture('level/stone', {
                wrapX: true,
                wrapY: true,
                factor: 0.8,
            }),
            this.loadTexture('level/stones', {
                wrapX: true,
                wrapY: true,
                factor: 0.8,
            }),
            this.loadTexture('level/toxic', {
                wrapX: true,
                wrapY: true,
                factor: 0.25,
            }),
            this.loadTexture('level/water', {
                wrapX: true,
                wrapY: true,
                factor: 0.25,
            }),
            this.loadTexture('level/whole', {
                wrapX: true,
                wrapY: true,
                factor: 1,
            }),
        ])
    }

    getTexture(name: string): Texture {
        return this.__textures[name].texture
    }
    getTextureOptions(name: string): AssetsManager.TextureOptions {
        return this.__textures[name]
    }

    loadTexture(name: string, options: AssetsManager.LoadTextureOptions = {}): Promise<Texture> {
        const { wrapX, wrapY } = options
        let { factor } = options
        factor ??= 1

        this.__loaders[`texture ${name}`] = 0
        this.__updateProgress()

        return this.textureLoader
            .loadAsync(`/assets/${name}.png`, ev => {
                this.__loaders[`texture ${name}`] = ev.loaded / ev.total
                this.__updateProgress()
            })
            .then(texture => {
                if (wrapX) {
                    texture.wrapS = RepeatWrapping
                }

                if (wrapY) {
                    texture.wrapT = RepeatWrapping
                }

                this.__loaders[`texture ${name}`] = 1
                this.__updateProgress()
                this.__textures[name] = { factor, wrapX, wrapY, texture }
                return texture
            })
    }

    private __updateProgress(): void {
        const loaderKeys = Object.keys(this.__loaders)
        this.progress = loaderKeys.reduce((prev, k) => {
            return prev + this.__loaders[k]
        }, 0)
        this.progress /= loaderKeys.length
        if (this.progress === 1) {
            this.__loaders = {}
        }
    }

    private __textures: Record<string, AssetsManager.TextureOptions> = {}
    private __loaders: Record<string, number> = {}
}

export default AssetsManager
