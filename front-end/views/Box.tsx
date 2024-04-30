import { Mesh, BoxGeometry, MeshNormalMaterial } from 'three/src/Three'

interface Box {
    size: number
}
const Box = Fc((size?: number) => {
    size ??= 1

    const mesh = new Mesh(new BoxGeometry(1, 1, size), new MeshNormalMaterial())

    mesh.position.z = size / 2

    return mesh
})

export default Box
