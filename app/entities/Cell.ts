import { Mesh } from 'three/src/objects/Mesh'

import Game from '@/Game'
import CellView from '@/views/CellView'

@effect
export default class Cell extends Effect {
    mesh: Mesh

    constructor(type: string, x: number, y: number, z: number, h: number, deps: EffectDeps) {
        super(deps)

        this.mesh = CellView({
            type,
            x,
            y,
            z,
            h,
        })
    }

    onGameContext(): void {
        const game = this.context(Game)
        new InScene(this.mesh, game.scene, [this, Game])
    }
}
