import Acceleration3Able from 'ables/Acceleration3Able'
import LinearFriction3Able from 'ables/LinearFriction3Able'
import Move3Able from 'ables/Move3Able'
import Position3Able from 'ables/Position3Able'

interface Body3Able extends Position3Able {
    movement: Move3Able
    acceleration: Acceleration3Able
    friction: LinearFriction3Able
}
const Body3Able = Fc(function (this: Body3Able, entity: Entity) {
    Fc.super(Position3Able, entity)

    Fc.public(() => {
        movement
        acceleration
        friction
    })

    const movement = new Move3Able(entity)
    const acceleration = new Acceleration3Able(entity)
    const friction = new LinearFriction3Able(entity, percents(20))
})

export default Body3Able
