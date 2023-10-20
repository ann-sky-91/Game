import Acceleration3Able from 'ables/Acceleration3Able'
import Move3Able from 'ables/Move3Able'
import Position3Able from 'ables/Position3Able'
import { Vector3 } from 'three/src/Three'

export default class Movement3System {
    static Components = {
        movement: [Position3Able, Move3Able],
        acceleration: [Position3Able, Move3Able, Acceleration3Able],
    }

    movement: {
        Position3Able: Position3Able
        Move3Able: Move3Able
    }[] = []
    acceleration: {
        Move3Able: Move3Able
        Acceleration3Able: Acceleration3Able
    }[] = []

    run(dt: number): void {
        this.movement.forEach(entity => {
            const position = entity.Position3Able
            const movement = entity.Move3Able

            position.add(new Vector3(movement.x, movement.y, movement.z).multiplyScalar(dt / 1000))
        })

        this.acceleration.forEach(entity => {
            const movement = entity.Move3Able
            const acceleration = entity.Acceleration3Able

            movement.add(
                new Vector3(acceleration.x, acceleration.y, acceleration.z).multiplyScalar(
                    dt / 1000
                )
            )
        })
    }
}
