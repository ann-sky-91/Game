const { pathsToModuleNameMapper } = require('ts-jest')

const { compilerOptions } = require('./tsconfig')

if (compilerOptions.paths['*'][0] === '*') {
    compilerOptions.paths['*'][0] = './*'
}
compilerOptions.paths['./*'] = compilerOptions.paths['*']
delete compilerOptions.paths['*']

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
    modulePaths: ['<rootDir>'],
    coverageDirectory: './coverage',
    moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
    testRegex: '.*\\.test\\.ts$',
    transform: { '^.+\\.(t|j)s$': 'ts-jest' },
    collectCoverageFrom: ['**/*.(t|j)s'],
}
