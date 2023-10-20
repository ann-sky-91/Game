import Body3Able from 'front-end/components/@Body3Able'
import Game from 'front-end/Front-End-Game'
import Box from 'front-end/views/Box'
import { Vector3 } from 'three/src/Three'

interface Player extends Body3Able {
    view: Three.Mesh

    move(): number
}
const Player = Fc<Player>(() => {
    Fc.public(() => {
        to0x0
    })

    let { x, y } = Fc.super(Body3Able)
    const { z, acceleration } = Fc.super(Body3Able)

    const { scene, camera } = Fc.context(Game)

    const view = new Box().in(this, scene)

    new WasdController(this, acceleration)

    Frame(this, () => {
        view.position.x = x
        view.position.y = y
        view.position.z = z

        console.log((acceleration.angleTo(new Vector3(1, 0, 0)) / Math.PI) * 180)

        view.rotation.y += (acceleration.angleTo(new Vector3(1, 0, 0)) - view.rotation.y) / 10

        camera.lookAt(x, y, z)
    })

    function to0x0(): void {
        x = 0
        y = 0
    }
})

export default Player
