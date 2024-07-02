export const textures = [
    'bricks',
    'bricks2',
    'stone',
    'dirt',
    'dirt2',
    'door',
    'forest-ground',
    'grass',
    'grass2',
    'ground',
    'ice',
    'lava',
    'leaves',
    'leaves2',
    'leaves3',
    'leaves4',
    'leaves5',
    'sand',
    'stones',
    'toxic',
    'water',
    'whole',
    'deep-water',
]

export const wallTextures = ['bricks', 'bricks2', 'stone']

export const floorTextures = ['grass', 'grass2']

export const texturesWithPadding = {
    dirt: {
        zIndex: 0,
    },
    dirt2: {
        zIndex: 0,
    },
    'forest-ground': {
        zIndex: 0,
    },
    grass: {
        zIndex: 0,
    },
    grass2: {
        zIndex: 0,
    },
    ground: {
        zIndex: 0,
    },
    ice: {
        zIndex: 0,
    },
    lava: {
        zIndex: 0,
    },
    leaves: {
        zIndex: 0,
    },
    leaves2: {
        zIndex: 0,
    },
    leaves3: {
        zIndex: 0,
    },
    leaves4: {
        zIndex: 0,
    },
    leaves5: {
        zIndex: 0,
    },
    sand: {
        zIndex: 0,
    },
    toxic: {
        zIndex: 0,
    },
    water: {
        zIndex: 0,
    },
    whole: {
        zIndex: 0,
    },
    'deep-water': {
        zIndex: 0,
    },
}

let zIndex = 1
textures.forEach(texture => {
    if (texturesWithPadding[texture]) {
        texturesWithPadding[texture].zIndex = zIndex
        ++zIndex
    }
})
