interface Move3Able extends Component, Three.Vector3 {}
const Move3Able = Fc<Move3Able, [x?: number, y?: number, z?: number]>(
    (x?: number, y?: number, z?: number) => {
        Fc.super(Component)
        Fc.super(Three.Vector3, x, y, z)
    }
)

export default Move3Able
