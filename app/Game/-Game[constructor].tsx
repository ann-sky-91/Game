const cx = await classnames('Game', import('../Game.module.scss'))

import { createRoot } from 'react-dom/client'
import SkyPerspectiveCamera from 'sky/cameras/SkyPerspectiveCamera'
import Vector3 from 'sky/math/Vector3'
import SkyRenderer from 'sky/renderers/SkyRenderer'
import Acceleration3System from 'sky/systems/Acceleration3System'
import Friction3System from 'sky/systems/Friction3System'
import LinearFriction3System from 'sky/systems/LinearFriction3System'
import Movement3System from 'sky/systems/Movement3System'
import { AmbientLight } from 'three/src/lights/AmbientLight'
import { DirectionalLight } from 'three/src/lights/DirectionalLight'
import { Scene } from 'three/src/scenes/Scene'

import Player from '@/entities/Player'
import Game from '@/Game'

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

    interface CreateLightOptions {
        alpha: number
        position: Vector3
    }

    function createLight(options: CreateLightOptions): void {
        const light = new DirectionalLight(0xffffff, options.alpha)
        light.castShadow = true
        light.position.copy(options.position)
        light.target.position.set(0, 0, 0)
        scene.add(light)
        scene.add(light.target)
    }

    createLight({
        alpha: 0.4,
        position: new Vector3(0, 10, 10),
    })
    createLight({
        alpha: 0.5,
        position: new Vector3(-10, -10, -10),
    })
    createLight({
        alpha: 0.3,
        position: new Vector3(10, -10, 0),
    })

    const camera = (this.camera = new SkyPerspectiveCamera(
        this,
        40,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    ))

    const renderer = (this.renderer = new SkyRenderer(this, {
        size: (): [number, number] => [window.innerWidth, window.innerHeight],
    }))

    const canvas = renderer.domElement
    document.querySelector('#root').before(canvas)
    cx`canvas` && canvas.classList.add(cx`canvas`)

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
