import '@/imports'
import 'sky/styles/components/Page.scss'
import Game from '@/Game'
import AssetsManager from '@/helpers/AssetsManager'

declare global {
    const assetsManager: AssetsManager
}

globalify({ assetsManager: new AssetsManager() })

new Game()
