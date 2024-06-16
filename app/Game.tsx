import 'app/imports'
import { createRoot } from 'react-dom/client'
import { Text } from 'react-native'
import { Scene, PerspectiveCamera, WebGLRenderer } from 'three'

import Level, { LevelSave } from './entities/Level'
import Player from './entities/Player'
import GameConstructor from './Game/-Game[constructor]'

export default class Game extends Root {
    static context = 'GameContext'

    systems: Systems
    scene: Scene
    camera: PerspectiveCamera
    renderer: WebGLRenderer
    player: Player
    level: Level

    constructor() {
        super()

        this.UI = this.UI.bind(this)

        const root = createRoot(document.getElementById('root'))
        root.render(<this.UI />)

        GameConstructor.call(this)
    }

    UI = function UI(): ReactNode {
        const [, update] = useState(() => {
            new AnimationFrames(() => {
                update(value => !value)
            }, [this])

            return false
        })

        if (assetsManager.progress < 1) {
            return (
                <div className="panel">Loading... {(assetsManager.progress * 100).toFixed(0)}%</div>
            )
        }

        const { position } = this.player.Position3Able

        return (
            <Text>
                {position.x.toFixed(2)}, {position.y.toFixed(2)}
            </Text>
        )
    }

    async loadLevel(this: Game, name: string): Promise<void> {
        this.level = new Level(this, await fetch.json<LevelSave>(`/levels/${name}.json`))
    }
}
