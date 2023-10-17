import 'front-end/@imports'
const cx = classnames('Game', await import('./Front-End-Game.module.scss'))
import Player from './entities/Player'
import Movement3System from './systems/Movement3System'

interface Game {
    player: Player
    renderer: Three.WebGLRenderer
    camera: Three.PerspectiveCamera
    scene: Three.Scene
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

    const scene = (state.scene = new Three.Scene())
    state.scene.add(new Three.GridHelper(5, 5))

    const camera = (state.camera = new Three.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    ))
    camera.position.set(1.5, 1.5, 1.5)
    camera.lookAt(0, 0, 0)

    const renderer = (state.renderer = new Three.WebGLRenderer())
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

    AnimationFrames(state, () => {
        renderer.render(scene, camera)
        state.run()
    })

    return state
}
