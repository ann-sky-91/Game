import 'app/imports'
import 'sky/styles/Page.scss'
import Game from './App'
import AssetsManager from './helpers/AssetsManager'

declare global {
    const assetsManager: AssetsManager
}

globalify({ assetsManager: new AssetsManager() })

new Game()
