import Game from 'front-end/Front-End-Game'
import Vector2 from 'math/Vector2'
import { BoxGeometry } from 'three/src/geometries/BoxGeometry'
import { MeshPhysicalMaterial } from 'three/src/materials/MeshPhysicalMaterial'
import { Mesh } from 'three/src/objects/Mesh'

@effect
export default class Cell extends Effect {
    mesh: Mesh

    constructor(type: string, x: number, y: number, z: number, h: number, deps: EffectDeps) {
        super(deps)

        const hAspect = 1 / 4
        const planeH = Math.max(h * hAspect, 0.1)

        this.mesh = new Mesh(
            new BoxGeometry(1, 1, planeH, 1, 1, 1),
            new MeshPhysicalMaterial({
                map: assetsManager.getTexture(`level/${type}`),
            })
        )

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
