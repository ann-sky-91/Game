#!/usr/bin/env -S npx tsx
import child_process from 'child_process'
import fs from 'fs'
import path from 'path'

const modulesPath = path.join(process.cwd(), 'modules')

interface RunOptions {
    cwd?: string
}
function run(command: string, options: RunOptions = {}): void {
    let { cwd } = options
    cwd ??= process.cwd()

    // eslint-disable-next-line no-console
    console.log(command)
    child_process.execSync(command, {
        stdio: 'inherit',
        cwd,
    })
}

run('npm i')
run('rm -rf ./modules')

if (fs.statSync('./modules').isDirectory()) {
    run('git pull --force')
    run('npm i', { cwd: modulesPath })
    run('npm audit fix', { cwd: modulesPath })
    run('npm link', { cwd: modulesPath })
    run('npm link sky')
} else {
    run('git clone https://github.com/annsky91/modules')
    run('npm i', { cwd: modulesPath })
}
