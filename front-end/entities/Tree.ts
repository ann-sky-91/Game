import Game from 'front-end/Front-End-Game'
import Box from 'front-end/views/Box'

interface Tree extends Entity {}
interface TreeOptions {}
const Tree = Fc((parent: Parent, options = {}): as<Tree> => {
    const { context } = parent

    const { scene } = context(Game)

    new Box(5)
    //.in(scene, [this, Game])
})

export default Tree
