import Acceleration3Able from 'ables/Acceleration3Able'
import LinearFriction3Able from 'ables/LinearFriction3Able'
import Move3Able from 'ables/Move3Able'
import Position3Able from 'ables/Position3Able'

interface Body3Able extends Position3Able {
    movement: Move3Able
    acceleration: Acceleration3Able
    friction: LinearFriction3Able
}
const Body3Able = Fc<Body3Able>(() => {
    Fc.super(Position3Able, this)

    Fc.public(() => {
        movement
        acceleration
        friction
    })

    const movement = new Move3Able(this)
    const acceleration = new Acceleration3Able(this)
    const friction = new LinearFriction3Able(this, percents(20))
})

export default Body3Able
