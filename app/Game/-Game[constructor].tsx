const cx = await classnames('Game', import('../Game.module.scss'))

import { createRoot } from 'react-dom/client'
import SkyPerspectiveCamera from 'sky/cameras/SkyPerspectiveCamera'
import ShadowRenderTargert from 'sky/lights/ShadowRenderTarget'
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

    const scene = (this.scene = new Scene())

    await assetsManager.loadLevelTextures()
    await assetsManager.loadPlayerTextures()

    await this.loadLevel('stage1_1')

    const systems = (this.systems = new Systems(this, [
        new Movement3System(),
        new Friction3System(),
        new LinearFriction3System(),
        new Acceleration3System(),
    ]))

    const ambientLight = new AmbientLight(0xffffff, 0.1)
    scene.add(ambientLight)

    interface CreateLightOptions {
        alpha: number
        position: Vector3
    }

    const createLight = (options: CreateLightOptions): void => {
        const light = new DirectionalLight(0xffffff, options.alpha)
        light.position.copy(options.position)
        light.target.position.set(this.level.w / 2, this.level.h / 2, 0)
        light.castShadow = true
        scene.add(light)
        scene.add(light.target)

        this.lights.push(light)
        this.shadowRenderTargets.push(
            new ShadowRenderTargert({
                position: options.position,
                targetPosition: new Vector3(this.level.w / 2, this.level.h / 2, 0),
                scene,
            })
        )
    }

    createLight({
        alpha: 1,
        position: new Vector3(0, 0, 30),
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

    const timer = new Timer()

    new AnimationFrames(() => {
        systems.run()
        // renderer.setClearColor('#FFFFFF', 1.0)
        // this.shadowRenderTargets.forEach(renderTarget => {
        //     renderer.render(scene, renderTarget.camera)
        // })
        renderer.setClearColor('#111', 1.0)
        renderer.render(scene, camera)
        const dt = timer.time()
        this.emit('beforeUpdate', dt)
        this.emit('update', dt)
        this.emit('afterUpdate', dt)
        this.emit('beforeAnimationFrame', dt)
        this.emit('onAnimationFrame', dt)
        this.emit('afterAnimationFrame', dt)
    }, [this])

    this.player = new Player(this)
}
