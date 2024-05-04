import Level, { LevelSave } from 'front-end/entities/Level'
import Game from 'front-end/Front-End-Game'

export default async function loadMap(this: Game, name: string): Promise<void> {
    const level = await fetch.json<LevelSave>(`/levels/${name}.json`)
    this.level = new Level(this, level)
}
