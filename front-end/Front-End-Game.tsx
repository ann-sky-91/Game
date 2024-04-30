import 'front-end/@imports'
const cx = classnames('Game', await import('./Front-End-Game.module.scss'))
import Tree from 'front-end/entities/Tree'
import Acceleration3System from 'systems/Acceleration3System'
import Friction3System from 'systems/Friction3System'
import LinearFriction3System from 'systems/LinearFriction3System'
import Movement3System from 'systems/Movement3System'
import { Scene, PerspectiveCamera, WebGLRenderer, GridHelper } from 'three/src/Three'

import Player from './entities/Player'

interface Game extends Root {
    systems: Systems
    player: Player
    renderer: WebGLRenderer
    camera: PerspectiveCamera
    scene: Scene
    canvas: HTMLCanvasElement
}
const Game = Fc.context<Game>(() => {
    Fc.super(Root)

    Fc.public(() => {
        systems
        player
        renderer
        camera
        scene
        canvas

        UI
    })
    
    const systems = new Systems([
        new Movement3System(),
        new Friction3System(),
        new LinearFriction3System(),
        new Acceleration3System(),
    ])

    const scene = new Scene()
    scene.add(new GridHelper(100, 500, 0x883300, 0x333333).rotateX(Math.PI / 2))

    const camera = new PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    camera.up.set(0, 0, 1)
    camera.position.set(0, -3, 10)
    camera.lookAt(0, 0, 0)

    const renderer = new WebGLRenderer({
        premultipliedAlpha: true,
        antialias: true,
    })
    const canvas = renderer.domElement
    document.querySelector('#root').before(canvas)
    cx`canvas` && canvas.classList.add(cx`canvas`)

    renderer.setSize(window.innerWidth, window.innerWidth, false)

    new EventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight, false)
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
    }, [this])

    new AnimationFrames(() => {
        systems.run()
        renderer.render(scene, camera)
    }, [this])

    const player = new Player(this)
    new Tree(this)

    const UI = () => {
        return (
            <div className='panel'>
                {player.x.toFixed(2)}, {player.y.toFixed(2)}
            </div>
        )
    }
})

export default Game
