import child_process from 'child_process'
import fs from 'fs'
import path from 'path'

import autoprefixer from 'libs/dev/autoprefixer'
import esbuild, { ServeOptions } from 'esbuild'
import manifestPlugin from 'esbuild-plugin-manifest'
import sassPlugin from 'esbuild-sass-plugin'
import postcss from 'postcss'
import tailwindCss from 'tailwindcss'

interface Config {
    port: number
    entries: string[]
    public?: string
    open?: boolean
}

// const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8')) as Config

// const context = await esbuild.context({
//     entryPoints: config.entries,
//     bundle: true,
//     splitting: true,
//     minify: false,
//     sourcemap: true,
//     treeShaking: true,
//     keepNames: true,
//     format: 'esm',
//     target: ['es2022'],
//     write: false,
//     plugins: [
//         manifestPlugin(),
//         sassPlugin({
//             async transform(source, resolveDir) {
//                 const { css } = await postcss([tailwindCss, autoprefixer]).process(source, {
//                     from: resolveDir,
//                 })
//                 return css
//             },
//         }),
//     ],
// })

// await context.watch()
// const serveOptions: ServeOptions = {
//     onRequest(args): void {
//         // eslint-disable-next-line no-console
//         console.log('onRequest: ', args)
//     },
// }

// if (config.public) {
//     serveOptions.servedir = config.public
// }

// await context.serve(serveOptions)

// // eslint-disable-next-line no-console
// console.log('Watching...', `http://localhost:${config.port}`)

// if (config.open) {
//     const start =
//         process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open'
//     child_process.execSync(`${start} http://localhost:${config.port}`)
// }
