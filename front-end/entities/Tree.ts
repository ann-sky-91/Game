import Game from 'front-end/Front-End-Game'
import BoxView from 'front-end/views/BoxView'

export default class Tree extends Entity {
    onGameContext(): void {
        const { scene } = this.context(Game)

        const view = BoxView(5)
        new InScene(view, scene, [this, Game])
    }
}
