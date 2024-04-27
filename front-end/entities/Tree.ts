import Game from 'front-end/Front-End-Game'
import Box from 'front-end/views/Box'

interface Tree extends Entity {}
const Tree = Fc<Tree>(() => {
    const { scene } = context(Game)

    new Box(5).in(this, scene)
})

export default Tree
