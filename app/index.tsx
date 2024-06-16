import 'app/imports'
import 'sky/styles/Page.scss'
import Game from './App'
import AssetsManager from './helpers/AssetsManager'

declare global {
    const assetsManager: AssetsManager
}

globalify({ assetsManager: new AssetsManager() })

const game = new Game()

export default function App(): ReactNode {
    return <game.UI />
}
