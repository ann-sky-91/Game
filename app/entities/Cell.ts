import Game from '@/Game'
import CellView from '@/views/CellView'

@effect
export default class Cell extends Effect {
    view: CellView

    constructor(type: string, x: number, y: number, z: number, h: number, deps: EffectDeps) {
        super(deps)

        this.view = new CellView({
            type,
            x,
            y,
            z,
            h,
        })
    }

    onGameContext(): void {
        const game = this.context(Game)
        new InScene(this.view, game.scene, [this, Game])
    }
}
