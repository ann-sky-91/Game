import 'front-end/@imports'
const cx = classnames('Game', await import('./Front-End-Game.module.scss'))
import { Scene, PerspectiveCamera, WebGLRenderer, GridHelper } from 'three/src/Three'

import Player from './entities/Player'
import Movement3System from './systems/Movement3System'

interface Game {
    player: Player
    renderer: WebGLRenderer
    camera: PerspectiveCamera
    scene: Scene
    canvas: HTMLCanvasElement
}
const Game = context<Game>(() => {
    const { player } = useMemo(createContext, [])

    return (
        <>
            {player.x}, {player.y}
        </>
    )
})

export default Game

function createContext(): Game {
    const state = new Entities([new Movement3System()]) as Entities & Game

    const scene = (state.scene = new Scene())
    state.scene.add(new GridHelper(5, 50, 0x883300, 0x333333))

    const camera = (state.camera = new PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    ))
    camera.position.set(1.5, 1.5, 1.5)
    camera.lookAt(0, 0, 0)

    const renderer = (state.renderer = new WebGLRenderer())
    state.canvas = renderer.domElement
    document.querySelector('#root').before(state.canvas)
    cx`canvas` && state.canvas.classList.add(cx`canvas`)

    renderer.setSize(window.innerWidth, window.innerWidth, false)

    new EventListener(state, 'resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight, false)
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
    })

    Game.run(() => {
        state.player = new Player(state)
    }, state)

    const emitFrame = emittingFrame(state, { auto: false })

    AnimationFrames(state, () => {
        state.run()
        emitFrame()
        renderer.render(scene, camera)
    })

    return state
}
