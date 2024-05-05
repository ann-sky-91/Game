import Game from 'front-end/Front-End-Game'
import { BoxGeometry } from 'three/src/geometries/BoxGeometry'
import { PlaneGeometry } from 'three/src/geometries/PlaneGeometry'
import { MeshPhysicalMaterial } from 'three/src/materials/MeshPhysicalMaterial'
import { Mesh } from 'three/src/objects/Mesh'

@effect
export default class Cell extends Effect {
    mesh: Mesh

    constructor(type: string, x: number, y: number, z: number, h: number, deps: EffectDeps) {
        super(deps)

        const hAspect = 1 / 3
        const planeH = h * hAspect

        if (planeH === 0) {
            this.mesh = new Mesh(
                new PlaneGeometry(1, 1, 1, 1),
                new MeshPhysicalMaterial({
                    metalness: 0.5,
                    roughness: 0.5,
                    precision: 'lowp',
                    map: assetsManager.getTexture(`level/${type}`),
                })
            )
        } else {
            this.mesh = new Mesh(
                new BoxGeometry(1, 1, planeH, 1, 1, 1),
                new MeshPhysicalMaterial({
                    metalness: 0.5,
                    roughness: 0.5,
                    precision: 'lowp',
                    map: assetsManager.getTexture(`level/${type}`),
                })
            )
        }
        this.mesh.castShadow = true
        this.mesh.receiveShadow = true

        const uvAttribute = this.mesh.geometry.attributes.uv
        for (let i = 0; i < uvAttribute.count; i++) {
            const u = uvAttribute.getX(i)
            const v = uvAttribute.getY(i)
            uvAttribute.setXY(i, u, v)
            // TODO
        }

        this.mesh.position.x = x
        this.mesh.position.y = y
        this.mesh.position.z = z * 6 * hAspect + planeH / 2
    }

    onGameContext(): void {
        const game = this.context(Game)
        new InScene(this.mesh, game.scene, [this, Game])
    }
}
