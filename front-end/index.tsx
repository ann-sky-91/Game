import 'front-end/imports'
import 'styles/Page.scss'
import Game from './Front-End-Game'
import AssetsManager from './helpers/AssetsManager'

declare global {
    const assetsManager: AssetsManager
}

globalify({ assetsManager: new AssetsManager() })

new Game()
