import 'front-end/@imports'
import { Scene, PerspectiveCamera, WebGLRenderer } from 'three/src/Three'

import Level, { LevelSave } from './entities/Level'
import Player from './entities/Player'
import GameConstructor from './Front-End-Game/-Front-End-Game[constructor]'

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
        const { position } = this.player.Position3Able

        const [, update] = useState(() => {
            new AnimationFrames(() => {
                update(value => !value)
            }, [this])

            return false
        })

        return (
            <div className="panel">
                {position.x.toFixed(2)}, {position.y.toFixed(2)}
            </div>
        )
    }

    async loadLevel(this: Game, name: string): Promise<void> {
        const level = await fetch.json<LevelSave>(`/levels/${name}.json`)
        this.level = new Level(this, level)
    }
}
