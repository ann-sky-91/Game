import Game from 'front-end/Front-End-Game'
import Box from 'front-end/views/Box'

interface Tree {}
const Tree = Fc<Tree>(() => {
    const { scene } = Fc.context(Game)

    new Box(5).in(this, scene)
})

export default Tree
