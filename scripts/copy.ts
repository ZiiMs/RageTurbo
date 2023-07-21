import { greenBright, blueBright, redBright } from 'colorette';
import jetpack from 'fs-jetpack';



const basePath = '/mnt/e/Servers/RageTest';

/**
 * Generate success console message
 */
function successMessage(message:string, type = 'Success') {
    console.log(`[${greenBright(type)}] ${message}`);
}

function cleanUp() {
    if (!jetpack.exists(basePath)) {
        return;
    }

    const preserved = [
        'node_modules/**/*',
        'ragemp-server*',
        'run.bat',
        'BugTrap-x64.dll',
        'bin/**/*',
        'dotnet/**/*',
        'maps/**/*',
        'plugins/**/*',
        'client_packages/game_resources/dlcpacks/**/*',
        'client_packages/**/*',
        'client_packages/cef/*',
        'pnpm-lock.yaml',
        'package-lock.json',
        'packages/**/*',
        'yarn.lock'
    ];

    const removeablePaths = jetpack.find(basePath, {
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
 * Generate error console message
 */
function errorMessage(message: string, type = 'Error') {
    console.log(`[${redBright(type)}] ${message}`);
}
function copy(source: string, destination: string, options = { overwrite: true }) {
    return jetpack.copy(source, destination, options);
}

function copyFiles() {
	const prepareForCopy = [];

	prepareForCopy.push(
		{
			from: jetpack.path('package.json'),
			to: jetpack.path(basePath, 'package.json')
		},
		{
			from: jetpack.path('.env'),
			to: jetpack.path(basePath, '.env')
		},
		{
			from: jetpack.path('conf.json'),
			to: jetpack.path(basePath, 'conf.json')
		}
	);

	prepareForCopy.forEach((item) => {
		copy(item.from, item.to);
		successMessage(blueBright(`${item.from} -> ${item.to}`), 'Copied');
	});
}

cleanUp()
copyFiles()
