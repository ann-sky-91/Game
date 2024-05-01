import { Mesh, BoxGeometry, MeshNormalMaterial } from 'three/src/Three'

export default function BoxView(size: number = 1): Mesh {
    const mesh = new Mesh(new BoxGeometry(1, 1, size), new MeshNormalMaterial())

    mesh.position.z = size / 2

    return mesh
}
