import Body3Able from 'front-end/components/@Body3Able'
import Game from 'front-end/Front-End-Game'
import Box from 'front-end/views/Box'

interface Player extends Body3Able {
    view: Three.Mesh

    move(): number
}
const Player = Fc<Player>(() => {
    Fc.public(() => {
        to0x0
    })

    const { acceleration } = Fc.super(Body3Able)
    let { x, y, z } = Fc.super(Body3Able)

    const { scene, camera } = context(Game)

    const view = new Box().in(this, scene)

    new WasdController(this, {
        camera,
        acceleration,
        force: 200,
    })

    Frame(this, () => {
        view.position.x = x
        view.position.y = y
        view.position.z = 1 / 2

        camera.lookAt(x, y, z)
        camera.position.x = x
        camera.position.y = y - 10
    })

    function to0x0(): void {
        x = 0
        y = 0
        z = 0
    }
})

export default Player
