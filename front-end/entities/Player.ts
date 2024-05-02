import Acceleration3Able from 'ables/Acceleration3Able'
import LinearFriction3Able from 'ables/LinearFriction3Able'
import Move3Able from 'ables/Move3Able'
import Position3Able from 'ables/Position3Able'
import Game from 'front-end/Front-End-Game'
import BoxView from 'front-end/views/BoxView'
import Vector3 from 'math/Vector3'

@entity
export default class Player extends Entity {
    Position3Able: Position3Able
    Move3Able: Move3Able
    Acceleration3Able: Acceleration3Able
    LinearFriction3Able: LinearFriction3Able

    view: Three.Object3D
    wasdController: WasdController

    onGameContext(): void {
        new Position3Able(this)
        new Move3Able(this)
        new Acceleration3Able(this)
        new LinearFriction3Able(this, percentsPerSecond(20))

        const { camera } = this.context(Game)

        const onControllersUpdate = (): void => {
            const acceleration = new Vector3(
                wasdController.acceleration.x,
                wasdController.acceleration.y,
                0
            )
            acceleration.applyEuler(this.getCameraDirection2D())
            this.Acceleration3Able.acceleration.x = acceleration.x
            this.Acceleration3Able.acceleration.y = acceleration.y
        }

        const wasdController = new WasdController([this, Game], {
            force: 200,
            onUpdate: onControllersUpdate,
        })

        new ThirdPersonCameraController([this, Game], {
            camera,
            target: this.Position3Able.position,
            onUpdate: onControllersUpdate,
        })

        new EventListener('mousedown', () => document.body.requestPointerLock(), [this, Game])

        const { scene } = this.context(Game)

        const view = (this.view = BoxView())
        new InScene(view, scene, [this, Game])
    }

    onAnimationFrame(): void {
        const { view } = this
        const { position } = this.Position3Able
        const { x, y } = position
        view.position.x = x
        view.position.y = y
        view.position.z = 1 / 2
        view.rotation.copy(this.getCameraDirection2D())
    }

    getCameraDirection2D = (): Three.Euler => {
        const { camera } = this.context(Game)

        const rotation = camera.rotation.clone()
        return rotation
    }

    to0x0(): void {
        const { position } = this.Position3Able
        position.x = 0
        position.y = 0
        position.z = 0
    }
}
