import '@/imports'
import { Text, StyleProp, TextStyle } from 'react-native'
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

        GameConstructor.call(this)
    }

    UI = function UI(): ReactNode {
        const [, update] = useState(() => {
            new AnimationFrames(() => {
                update(value => !value)
            }, [this])

            return false
        })

        const style: StyleProp<TextStyle> = {
            padding: 10,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }

        if (assetsManager.progress < 1) {
            return (
                <Text style={style}>Loading... {(assetsManager.progress * 100).toFixed(0)}%</Text>
            )
        }

        const { position } = this.player.Position3Able

        return (
            <Text style={style}>
                {position.x.toFixed(2)}, {position.y.toFixed(2)}
            </Text>
        )
    }

    async loadLevel(this: Game, name: string): Promise<void> {
        this.level = new Level(this, await fetch.json<LevelSave>(`/levels/${name}.json`))
    }
}
