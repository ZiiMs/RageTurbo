import { greenBright, redBright } from 'colorette';
import { config } from 'dotenv';
import { build } from 'esbuild';
import jetpack from 'fs-jetpack';
import * as path from 'path';

config({
    path: path.resolve('.env')
});

const basePath = '/mnt/e/Servers/RageTest';
const sourcePath = path.resolve('src');
// const pkgJson = jetpack.read('package.json', 'json');
// const localInstalledPackages = [...Object.keys(pkgJson.dependencies)];
// const isProduction = process.env.NODE_ENV === 'production';

/**
 * Resolve given path by fs-jetpack
 */
// function resolvePath(pathParts) {
// 	return jetpack.path(...pathParts);
// }

/**
 * Generate success console message
 */
// function successMessage(message: string, type = 'Success') {
// 	console.log(`[${greenBright(type)}] ${message}`);
// }

/**
 * Generate error console message
 */
function errorMessage(message: string, type = 'Error') {
    console.log(`[${redBright(type)}] ${message}`);
}

/**
 * Copy given source to destination
 */
// function copy(source: string, destination: string, options = { overwrite: true }) {
// 	return jetpack.copy(source, destination, options);
// }

/**
 *
 * CleanUp the build output
 */
function cleanUp() {
    if (!jetpack.exists(basePath)) {
        return;
    }

    const cleanPath = path.join(basePath, '/client_packages/')
    const preserved = [
        'client_packages/game_resources/dlcpacks/**/*',
        'client_packages/cef/**/*',
        'client_packages/cef/*',
    ];

    const removeablePaths = jetpack.find(cleanPath, {
        matching: preserved.map((ipath) => {
            return `!${ipath}`;
        })
    });


    removeablePaths.forEach((path) => {
        jetpack.remove(path);
        errorMessage(path, 'Removed');
    });
}

/**
 * Copy all static files they needed
 */
// function copyFiles() {
// 	const prepareForCopy = [];
//
// 	prepareForCopy.push(
// 		{
// 			from: jetpack.path('package.json'),
// 			to: jetpack.path(basePath, 'package.json')
// 		},
// 		// {
// 		// 	from: jetpack.path('.env'),
// 		// 	to: jetpack.path(basePath, '.env')
// 		// },
// 		// {
// 		// 	from: jetpack.path('conf.json'),
// 		// 	to: jetpack.path(basePath, 'conf.json')
// 		// }
// 	);
//
// 	prepareForCopy.forEach((item) => {
// 		copy(item.from, item.to);
// 		successMessage(blueBright(`${item.from} -> ${item.to}`), 'Copied');
// 	});
// }

cleanUp();
// copyFiles();

build({
    entryPoints: [path.join(sourcePath, 'index.ts')],
    outdir: path.join(basePath, 'client_packages/'),
    tsconfig: "./tsconfig.json",
    loader: { '.ts': 'ts' },
    sourcemap: 'inline',
    platform: 'node',
    target: 'node18',
    bundle: true,
    minify: true,
    write: true,
    // format: 'esm',
    color: true,
   // splitting: true,
   // chunkNames: '[name]-[hash]',
    metafile: true,
    plugins: []
}).then(() => {
    console.log(`${greenBright('[SUCCESS]')} client built --->`, path.join(basePath, 'client/'));
})
.catch((err) => {
        errorMessage(err);
    });

