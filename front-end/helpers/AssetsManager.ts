import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Texture } from 'three/src/textures/Texture'

export default class AssetsManager {
    readonly textureLoader: TextureLoader
    progress: number = 1
    readonly textures: Record<string, Texture> = {}

    constructor() {
        this.textureLoader = new TextureLoader()
    }

    async loadLevelTextures(): Promise<void> {
        await Promise.all([
            this.loadTexture('level/bricks'),
            this.loadTexture('level/bricks2'),
            this.loadTexture('level/deep-water'),
            this.loadTexture('level/dirt'),
            this.loadTexture('level/dirt2'),
            this.loadTexture('level/door'),
            this.loadTexture('level/forest-ground'),
            this.loadTexture('level/grass'),
            this.loadTexture('level/grass2'),
            this.loadTexture('level/ground'),
            this.loadTexture('level/ice'),
            this.loadTexture('level/lava'),
            this.loadTexture('level/leaves'),
            this.loadTexture('level/leaves2'),
            this.loadTexture('level/leaves3'),
            this.loadTexture('level/leaves4'),
            this.loadTexture('level/leaves5'),
            this.loadTexture('level/sand'),
            this.loadTexture('level/stone'),
            this.loadTexture('level/stones'),
            this.loadTexture('level/toxic'),
            this.loadTexture('level/water'),
            this.loadTexture('level/whole'),
        ])
    }

    loadTexture(name: string): Promise<Texture> {
        this.__loaders[`texture ${name}`] = 0
        this.__updateProgress()

        return this.textureLoader
            .loadAsync(`/assets/${name}.png`, ev => {
                this.__loaders[`texture ${name}`] = ev.loaded / ev.total
                this.__updateProgress()
            })
            .then(texture => {
                this.__loaders[`texture ${name}`] = 1
                this.__updateProgress()
                this.textures[name] = texture
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

    private __loaders: Record<string, number> = {}
}
