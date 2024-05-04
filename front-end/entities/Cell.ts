import Game from 'front-end/Front-End-Game'
import { DoubleSide } from 'three/src/constants'
import { BoxGeometry } from 'three/src/geometries/BoxGeometry'
import { MeshPhysicalMaterial } from 'three/src/materials/MeshPhysicalMaterial'
import { Mesh } from 'three/src/objects/Mesh'

import Level from './Level'

@effect
export default class Cell extends Effect {
    plane: Mesh
    constructor(type: string, x: number, y: number, z: number, deps: EffectDeps) {
        super(deps)

        const hAspect = 0.5

        this.plane = new Mesh(
            new BoxGeometry(
                Level.CELL_SIZE,
                Level.CELL_SIZE,
                z * Level.CELL_SIZE * hAspect + 0.1,
                1,
                1,
                1
            ),
            new MeshPhysicalMaterial({
                map: assetsManager.textures[`level/${type}`],
                side: DoubleSide,
            })
        )

        this.plane.position.x = x * Level.CELL_SIZE
        this.plane.position.y = y * Level.CELL_SIZE
        this.plane.position.z = (z * Level.CELL_SIZE * hAspect + 0.1) / 2
    }

    onGameContext(): void {
        const game = this.context(Game)
        new InScene(this.plane, game.scene, [this, Game])
    }
}
