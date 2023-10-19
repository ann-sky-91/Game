import 'back-end/@imports'

const entities = new Entities()

loop(time(1 / 10, seconds), time(1 / 20, seconds), async (): Promise<void> => {
    // eslint-disable-next-line no-console
    console.log('loop')
    return
})
