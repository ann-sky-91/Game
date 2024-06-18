import Acceleration3Able from 'sky/ables/Acceleration3Able'
import LinearFriction3Able from 'sky/ables/LinearFriction3Able'
import Move3Able from 'sky/ables/Move3Able'
import Position3Able from 'sky/ables/Position3Able'
import ThirdPersonCameraController from 'sky/controllers/ThirdPersonCameraController'
import WasdController2D from 'sky/controllers/WasdController2D'
import Vector2 from 'sky/math/Vector2'
import Vector3 from 'sky/math/Vector3'

import Game from '@/Game'
import ColoredSpriteView from '@/views/ColoredTextureView'

@entity
export default class Player extends Entity {
    Position3Able: Position3Able
    Move3Able: Move3Able
    Acceleration3Able: Acceleration3Able
    LinearFriction3Able: LinearFriction3Able

    view: Three.Object3D
    wasdController2D: WasdController2D
    thirdPersonCameraController: ThirdPersonCameraController

    constructor(deps: EffectDeps) {
        super(deps)

        new Position3Able(this, 100, 100)
        new Move3Able(this)
        new Acceleration3Able(this)
        new LinearFriction3Able(this, PercentsPerMillisecond(0.5))
    }

    onGameContext(): void {
        const { camera } = this.context(Game)

        const onControllersUpdate = (): void => {
            const acceleration = this.wasdController2D.acceleration

            this.Acceleration3Able.acceleration.x = acceleration.x
            this.Acceleration3Able.acceleration.y = acceleration.y

            this.thirdPersonCameraController.angles[0] = Math.PI / 4
        }

        this.wasdController2D = new WasdController2D([this, Game], {
            force: (): number => 7,
            direction: (): number => this.getCameraDirection2D(),
            onUpdate: onControllersUpdate,
        })

        this.thirdPersonCameraController = new ThirdPersonCameraController([this, Game], {
            camera,
            getTarget: (): Vector3 => this.Position3Able.position,
            pointerLock: false,
            distance: (): number => 8,
            z: (): number => 0,
            minAngle: (): number => (Math.PI * 3) / 8,
            maxAngle: (): number => (Math.PI * 3) / 8,
            onUpdate: onControllersUpdate,
        })

        new WindowEventListener(
            'mousemove',
            ev => {
                const { view } = this
                const vec = new Vector3(
                    (ev.clientX / window.innerWidth) * 2 - 1,
                    -(ev.clientY / window.innerHeight) * 2 + 1,
                    0
                )
                vec.unproject(camera)
                vec.sub(camera.position).normalize()
                const position = new Vector3()
                const distance = -camera.position.z / vec.z
                position
                    .copy(camera.position)
                    .add(vec.multiplyScalar(distance))
                    .sub(this.Position3Able.position)
                view.rotation.z = new Vector2().copy(position).angle()
            },
            this
        )

        onControllersUpdate()

        const { scene } = this.context(Game)

        const view = (this.view = ColoredSpriteView({
            texture: null,
            w: 0.4,
            h: 0.4,
        }))
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

    getCameraDirection2D = (): number => {
        return Math.PI / 2 - this.thirdPersonCameraController.angles[0]
    }
}
