import Game from '@/Game'
import BoxView from '@/views/BoxView'

@entity
export default class Wall extends Entity {
    onGameContext(): void {
        const { scene } = this.context(Game)

        const view = BoxView(5)
        new InScene(view, scene, [this, Game])
    }
}
