import Game from 'front-end/Front-End-Game'

export default async function loadMap(game: Game, mapPath: string): Promise<void> {
    const map = await fetch.json(mapPath)
    // eslint-disable-next-line no-console
    console.log(map)
}
