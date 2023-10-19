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

    let { x, y } = Fc.super(Body3Able)
    const { z, acceleration } = Fc.super(Body3Able)

    const { scene } = Fc.context(Game)

    const view = new Box().in(this, scene)

    new WasdController(this, acceleration)

    AnimationFrames(this, () => {
        view.position.x = x
        view.position.y = y
        view.position.z = z
    })

    Frame(this, dt => {
        // eslint-disable-next-line no-console
        console.log(dt)
    })

    function to0x0(): void {
        x = 0
        y = 0
    }
})

export default Player
