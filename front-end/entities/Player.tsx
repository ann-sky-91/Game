import Body3Able from 'front-end/components/@Body3Able'
import Game from 'front-end/Front-End-Game'
import Box from 'front-end/views/Box'

interface Player extends Body3Able {
    view: Three.Mesh

    move(): number
}
const Player = Fc<Player>(() => {
    Fc.public(() => {
        move
    })

    let { x, y } = Fc.super(Body3Able)
    const { z } = Fc.super(Body3Able)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { movement, acceleration } = Fc.super(Body3Able)

    const { scene } = Fc.context(Game)

    const view = new Box().in(this, scene)

    new WasdController(this)

    AnimationFrames(this, () => {
        acceleration.z = 0.1

        view.position.x = x
        view.position.y = y
        view.position.z = z

        view.rotation.y += 0.01
    })

    function move(): void {
        x = 0
        y = 0
    }
})

export default Player
