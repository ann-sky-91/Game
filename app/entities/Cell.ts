import { BoxGeometry } from 'three/src/geometries/BoxGeometry'
import { PlaneGeometry } from 'three/src/geometries/PlaneGeometry'
import { MeshPhysicalMaterial } from 'three/src/materials/MeshPhysicalMaterial'
import { Mesh } from 'three/src/objects/Mesh'

import Game from '@/Game'

@effect
export default class Cell extends Effect {
    mesh: Mesh

    constructor(type: string, x: number, y: number, z: number, h: number, deps: EffectDeps) {
        super(deps)

        const material = new MeshPhysicalMaterial({
            metalness: 0.5,
            roughness: 0.5,
            precision: 'lowp',
            map: assetsManager.getTexture(`level/${type}`),
        })

        if (h === 0) {
            this.mesh = new Mesh(new PlaneGeometry(1, 1, 1, 1), material)
        } else {
            this.mesh = new Mesh(new BoxGeometry(1, 1, h, 1, 1, 1), material)
        }

        this.mesh.castShadow = true
        this.mesh.receiveShadow = true

        const uvAttribute = this.mesh.geometry.attributes.uv
        for (let i = 0; i < uvAttribute.count; i++) {
            const u = uvAttribute.getX(i)
            const v = uvAttribute.getY(i)
            // console.log(i, u, v)
            uvAttribute.setXY(i, u, v)
            // TODO
        }

        this.mesh.position.x = x
        this.mesh.position.y = y
        this.mesh.position.z = z + h / 2
    }

    onGameContext(): void {
        const game = this.context(Game)
        new InScene(this.mesh, game.scene, [this, Game])
    }
}
