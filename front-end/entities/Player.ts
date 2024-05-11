import Acceleration3Able from 'ables/Acceleration3Able'
import LinearFriction3Able from 'ables/LinearFriction3Able'
import Move3Able from 'ables/Move3Able'
import Position3Able from 'ables/Position3Able'
import Game from 'front-end/Front-End-Game'
import BoxView from 'front-end/views/BoxView'
import Vector2 from 'math/Vector2'
import Vector3 from 'math/Vector3'

@entity
export default class Player extends Entity {
    Position3Able: Position3Able
    Move3Able: Move3Able
    Acceleration3Able: Acceleration3Able
    LinearFriction3Able: LinearFriction3Able

    view: Three.Object3D
    wasdController: WasdController
    thirdPersonCameraController: ThirdPersonCameraController

    constructor(deps: EffectDeps) {
        super(deps)

        new Position3Able(this, 100, 100)
        new Move3Able(this)
        new Acceleration3Able(this)
        new LinearFriction3Able(this, PercentsPerSecond(99.8))
    }

    onGameContext(): void {
        const { camera } = this.context(Game)

        const onControllersUpdate = (): void => {
            const acceleration = wasdController.acceleration
                .clone()
                .rotateAround(new Vector2(0, 0), this.getCameraDirection2D())
            this.Acceleration3Able.acceleration.x = acceleration.x
            this.Acceleration3Able.acceleration.y = acceleration.y
        }

        const wasdController = (this.wasdController = new WasdController([this, Game], {
            force: 7,
            onUpdate: onControllersUpdate,
        }))

        this.thirdPersonCameraController = new ThirdPersonCameraController([this, Game], {
            camera,
            getTarget: (): Vector3 => this.Position3Able.position,
            distance: 3,
            z: 1,
            minAngle: 0,
            onUpdate: onControllersUpdate,
        })

        const { scene } = this.context(Game)

        const view = (this.view = BoxView(0.2))
        new InScene(view, scene, [this, Game])
    }

    onAnimationFrame(): void {
        const { view } = this
        const { position } = this.Position3Able
        const { x, y } = position

        view.position.x = x
        view.position.y = y
        view.position.z = 1 / 2
        view.rotation.z = this.getCameraDirection2D()
    }

    getCameraDirection2D = (): number => {
        if (!this.thirdPersonCameraController) {
            return Math.PI / 2
        }

        return Math.PI / 2 - this.thirdPersonCameraController.angles[0]
    }

    to0x0(): void {
        const { position } = this.Position3Able
        position.x = 0
        position.y = 0
        position.z = 0
    }
}
