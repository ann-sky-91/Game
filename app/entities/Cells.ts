import Game from '@/Game'
import CellsView from '@/views/CellsView'

export type CellsInfo = {
    x: number
    y: number
    z: number
    h: number
    slug: string
}[]
@effect
export default class Cells extends Effect {
    view: CellsView

    constructor(cells: CellsInfo, deps: EffectDeps) {
        super(deps)

        this.view = new CellsView(cells)
    }

    onGameContext(): void {
        const game = this.context(Game)
        new InScene(this.view, game.scene, [this, Game])
    }
}
