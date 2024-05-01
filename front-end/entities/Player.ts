import Acceleration3Able from 'ables/Acceleration3Able'
import LinearFriction3Able from 'ables/LinearFriction3Able'
import Move3Able from 'ables/Move3Able'
import Position3Able from 'ables/Position3Able'
import Game from 'front-end/Front-End-Game'
import BoxView from 'front-end/views/BoxView'
import Vector3 from 'math/Vector3'

export default class Player extends Entity {
    Position3Able: Position3Able
    Move3Able: Move3Able
    Acceleration3Able: Acceleration3Able
    LinearFriction3Able: LinearFriction3Able

    view: Three.Object3D
    wasdController: WasdController

    constructor(parent: Parent) {
        super(parent)

        new Position3Able(this)
        new Move3Able(this)
        new Acceleration3Able(this)
        new LinearFriction3Able(this, percentsPerSecond(20))

        this.onGameContext()

        const { camera } = this.context(Game)

        const onControllersUpdate = (): void => {
            const acceleration = new Vector3(wasdAcceleration.x, wasdAcceleration.y, 0)
            acceleration.applyEuler(camera.rotation)
            acceleration.z = 0
            acceleration.normalize().multiplyScalar(200)
            this.Acceleration3Able.acceleration.x = acceleration.x
            this.Acceleration3Able.acceleration.y = acceleration.y
        }

        const { acceleration: wasdAcceleration } = new WasdController(this, {
            force: 1,
            onUpdate: onControllersUpdate,
        })

        new ThirdPersonCameraController(this, {
            camera,
            target: this.Position3Able.position,
            onUpdate: onControllersUpdate,
        })

        new EventListener('mousedown', () => document.body.requestPointerLock(), [this])
    }

    onGameContext(): void {
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
    }

    to0x0(): void {
        const { position } = this.Position3Able
        position.x = 0
        position.y = 0
        position.z = 0
    }
}
