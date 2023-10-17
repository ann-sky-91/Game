import Acceleration3Able from 'front-end/components/Acceleration3Able'
import Move3Able from 'front-end/components/Move3Able'
import Position3Able from 'front-end/components/Position3Able'

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

            position.add(
                new Three.Vector3(movement.x, movement.y, movement.z).multiplyScalar(dt / 1000)
            )
        })

        this.acceleration.forEach(entity => {
            const movement = entity.Move3Able
            const acceleration = entity.Acceleration3Able

            movement.add(
                new Three.Vector3(acceleration.x, acceleration.y, acceleration.z).multiplyScalar(
                    dt / 1000
                )
            )
        })
    }
}
