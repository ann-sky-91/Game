import Game from 'front-end/Front-End-Game'
import BoxView from 'front-end/views/BoxView'

@entity
export default class Wall extends Entity {
    onGameContext(): void {
        const { scene } = this.context(Game)

        const view = BoxView(5)
        new InScene(view, scene, [this, Game])
    }
}
