const cx = await classnames('Game', import('../Front-End-Game.module.scss'))
import Player from 'front-end/entities/Player'
import { createRoot } from 'react-dom/client'
import Acceleration3System from 'systems/Acceleration3System'
import Friction3System from 'systems/Friction3System'
import LinearFriction3System from 'systems/LinearFriction3System'
import Movement3System from 'systems/Movement3System'
import { AmbientLight } from 'three/src/lights/AmbientLight'
import { DirectionalLight, Scene, PerspectiveCamera, WebGLRenderer } from 'three/src/Three'

import Game from '../Front-End-Game'

export default async function GameConstructor(this: Game): Promise<void> {
    this.UI = this.UI.bind(this)
    const root = createRoot(document.querySelector('#root')!)
    root.render(<this.UI />)

    await assetsManager.loadLevelTextures()

    const systems = (this.systems = new Systems(this, [
        new Movement3System(),
        new Friction3System(),
        new LinearFriction3System(),
        new Acceleration3System(),
    ]))

    const scene = (this.scene = new Scene())

    const ambientLight = new AmbientLight(0xffffff, 0.1)
    scene.add(ambientLight)

    const light1 = new DirectionalLight(0xffffff, 0.9)
    light1.castShadow = true
    light1.position.set(0, 10, 10)
    light1.target.position.set(0, 0, 0)
    scene.add(light1)
    scene.add(light1.target)

    const light2 = new DirectionalLight(0xffffff, 0.5)
    light2.castShadow = true
    light2.position.set(-10, -10, -10)
    light2.target.position.set(0, 0, 0)
    scene.add(light2)
    scene.add(light2.target)

    const light3 = new DirectionalLight(0xffffff, 0.3)
    light3.castShadow = true
    light3.position.set(10, -10, 0)
    light3.target.position.set(0, 0, 0)
    scene.add(light3)
    scene.add(light3.target)

    const camera = (this.camera = new PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    ))
    camera.up.set(0, 0, 1)

    const renderer = (this.renderer = new WebGLRenderer({
        premultipliedAlpha: true,
        antialias: true,
    }))
    renderer.shadowMap.enabled = true
    const canvas = renderer.domElement
    document.querySelector('#root').before(canvas)
    cx`canvas` && canvas.classList.add(cx`canvas`)

    renderer.setSize(window.innerWidth, window.innerWidth, false)

    new WindowEventListener(
        'resize',
        () => {
            renderer.setSize(window.innerWidth, window.innerHeight, false)
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
        },
        [this]
    )

    new AnimationFrames(() => {
        systems.run()
        renderer.render(scene, camera)
        this.emit('beforeAnimationFrame')
        this.emit('onAnimationFrame')
        this.emit('afterAnimationFrame')
    }, [this])

    this.player = new Player(this)

    this.loadLevel('stage1_1')
}
