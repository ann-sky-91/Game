import Acceleration3Able from 'ables/Acceleration3Able'
import LinearFriction3Able from 'ables/LinearFriction3Able'
import Move3Able from 'ables/Move3Able'
import Position3Able from 'ables/Position3Able'
import Game from 'front-end/Front-End-Game'
import Box from 'front-end/views/Box'

interface PlayerOptions {

}
export default class Player extends Entity {
    Position3Able: Position3Able
    Move3Able: Move3Able
    Acceleration3Able: Acceleration3Able
    LinearFriction3Able: LinearFriction3Able

    constructor(parent: Parent, options: PlayerOptions = {}) {
        super(parent)

        new Position3Able(this)
        new Move3Able(this)
        new Acceleration3Able(this)
        new LinearFriction3Able(this, percentsPerSecond(20))

        const { scene, camera } = this.context(Game)
    
        const view = new Box()
        new InScene(view, scene, [this, Game])
    
        new WasdController(this, {
            camera,
            acceleration: this.Acceleration3Able.acceleration,
            force: 200,
        })
    
        onFrame(this, () => {
            const { position } = this.Position3Able
            const { x, y, z} = position
            view.position.x = x
            view.position.y = y
            view.position.z = 1 / 2
    
            camera.lookAt(x, y, z)
            camera.position.x = x
            camera.position.y = y - 10
        }, [this])
    }

    to0x0(): void {
        const { position } = this.Position3Able
        position.x = 0
        position.y = 0
        position.z = 0
    }
}
