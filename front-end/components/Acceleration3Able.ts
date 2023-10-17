interface Acceleration3Able extends Component, Three.Vector3 {}
const Acceleration3Able = Fc<Acceleration3Able, [x?: number, y?: number, z?: number]>(
    (x?: number, y?: number, z?: number) => {
        Fc.super(Component)
        Fc.super(Three.Vector3, x, y, z)
    }
)

export default Acceleration3Able
