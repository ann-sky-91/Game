import Body3Able from 'front-end/components/@Body3Able'
import Game from 'front-end/Front-End-Game'
import Box from 'front-end/views/Box'

interface Player extends Link, Body3Able {
    view: Three.Mesh

    to0x0(): void
    move(): number
}
interface PlayerOptions {

}
const Player = Fc((parent: Parent, options: PlayerOptions = {}): as<Player> => {
    const { context } = Fc.super(Link, parent)

    Fc.public(() => {
        to0x0
    })

    const { acceleration } = Fc.super(Body3Able)
    let { x, y, z } = Fc.super(Body3Able)

    const { scene, camera } = context(Game)

    const view = new Box()
    //view.in(scene, [this, Game])

    new WasdController(this, {
        camera,
        acceleration,
        force: 200,
    })

    onFrame(this, () => {
        view.position.x = x
        view.position.y = y
        view.position.z = 1 / 2

        camera.lookAt(x, y, z)
        camera.position.x = x
        camera.position.y = y - 10
    }, [this])

    function to0x0(): void {
        x = 0
        y = 0
        z = 0
    }
})

export default Player
