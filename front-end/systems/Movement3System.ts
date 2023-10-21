import Acceleration3Able from 'ables/Acceleration3Able'
import Friction3Able from 'ables/Friction3Able'
import LinearFriction3Able from 'ables/LinearFriction3Able'
import Move3Able from 'ables/Move3Able'
import Position3Able from 'ables/Position3Able'
import { Vector3 } from 'three/src/Three'

export default class Movement3System {
    static Components = {
        movement: [Position3Able, Move3Able],
        acceleration: [Position3Able, Move3Able, Acceleration3Able],
        friction: [Move3Able, Friction3Able],
        linearFriction: [Move3Able, LinearFriction3Able],
    }

    movement: {
        Position3Able: Position3Able
        Move3Able: Move3Able
    }[] = []
    acceleration: {
        Move3Able: Move3Able
        Acceleration3Able: Acceleration3Able
    }[] = []
    friction: {
        Move3Able: Move3Able
        Friction3Able: Friction3Able
    }[] = []
    linearFriction: {
        Move3Able: Move3Able
        LinearFriction3Able: LinearFriction3Able
    }[] = []

    run(dt: number): void {
        this.movement.forEach(entity => {
            const position = entity.Position3Able
            const movement = entity.Move3Able
            position.add(new Vector3().copy(movement).multiplyScalar(dt / 1000))
        })

        this.acceleration.forEach(entity => {
            const movement = entity.Move3Able
            const acceleration = entity.Acceleration3Able
            movement.add(new Vector3().copy(acceleration).multiplyScalar(dt / 1000))
        })

        this.friction.forEach(entity => {
            const movement = entity.Move3Able
            const friction = entity.Friction3Able

            if ((friction.value * dt * friction.value * dt) / 1000000 >= movement.lengthSq()) {
                movement.set(0, 0, 0)
                return
            }

            movement.sub(
                new Vector3()
                    .copy(movement)
                    .normalize()
                    .multiplyScalar((friction.value * dt) / 1000)
            )
        })

        this.linearFriction.forEach(entity => {
            const movement = entity.Move3Able
            const friction = entity.LinearFriction3Able

            movement.sub(new Vector3().copy(movement).multiplyScalar(friction.value / 100))
        })
    }
}
