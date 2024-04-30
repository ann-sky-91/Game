import Body3Able from 'front-end/components/@Body3Able'
import Game from 'front-end/Front-End-Game'
import Box from 'front-end/views/Box'

interface Player extends Entity, Body3Able {
    view: Three.Mesh

    to0x0(): void
    move(): number
}
interface PlayerOptions {

}
const Player = Fc(function (this: Player, parent: Parent, options: PlayerOptions = {}) {
    const { context } = Fc.super(Entity, parent)

    Fc.public(() => {
        to0x0
    })

    const { acceleration } = Fc.super(Body3Able, this)
    let { x, y, z } = Fc.super(Body3Able, this)

    const { scene, camera } = context(Game)

    const view = new Box()
    new InScene(view, scene, [this, Game])

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
