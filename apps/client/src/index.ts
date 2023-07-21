import { SHARED_CONSTANTS } from '@ziim/shared/constants';
import { colors } from '@ziim/shared/utils';
import { bindKey } from './keybinds';
let items: Items[] = [];
let browser: BrowserMp;
const Player = mp.players.local;
// mp.events.add('guiReady', () => {
// 	if (!browser) {
// 		browser = mp.browsers.new('package://cef/index.html');
// 		browser.active = true;
// 	}
// });
//
// let showScoreboard = false;
// let showInventory = false;
mp.gui.chat.colors = true;

mp.events.add('playerReady', () => {
	mp.console.logInfo(`${Player.name} is ready!`);
	mp.console.logInfo(SHARED_CONSTANTS.HELLO_WORLD);

	Player.customProperty = 1;
	mp.console.logInfo(`customProperty: ${Player.customProperty}`);

	Player.customMethod = () => {
		mp.console.logInfo(`customMethod called.`);
	};

	Player.customMethod();
});

bindKey('A', false, () => {
	mp.console.logInfo('A pressed correct');
});

// bindKey('i', true, () => {
// 	if (Player.isTypingInTextChat) return;
// 	showInventory = !showInventory;
// 	browser.execute(`trigger('toggle', '${JSON.stringify('inventory')}')`);
// 	showScoreboard = false;
// 	mp.gui.cursor.show(showInventory, showInventory);
// });
//
// bindKey('p', false, () => {
// 	mp.console.logInfo(`Typing: ${Player.isTypingInTextChat}`);
// 	if (Player.isTypingInTextChat) return;
// 	browser.execute(`trigger('toggle', '${JSON.stringify('scoreboard')}')`);
//
// 	showScoreboard = !showScoreboard;
// 	showInventory = false;
// 	mp.gui.cursor.show(false, false);
// });
//
// mp.events.add('render', () => {
// 	if (showScoreboard) {
// 		mp.players.forEachInRange(Player.position, 5, (player) => {
// 			const { x, y, z } = player.position;
// 			if (player === Player) {
// 				mp.game.graphics.drawText(`${player.id}`, [x, y, z + 1.1], {
// 					font: 0,
// 					color: [100, 149, 237, 255],
// 					centre: true,
// 					scale: [0.75, 0.75],
// 					outline: true
// 				});
// 			} else {
// 				mp.game.graphics.drawText(`${player.id}`, [x, y, z + 1.1], {
// 					font: 0,
// 					color: [255, 255, 255, 255],
// 					centre: true,
// 					scale: [0.75, 0.75],
// 					outline: true
// 				});
// 			}
// 		});
// 	}
// });
//
interface Items {
	id: number;
	name: string;
	image: string;
	func: string;
}

mp.events.add('addItem', (getItems: Items) => {
	mp.console.logInfo(`Item: ${getItems.name}`);

	const { id, name, image, func } = getItems;
	browser.execute(`trigger('addItem','${JSON.stringify({ id, name, image, func })}')`);
});

const useGun = (gun: string) => {
	if (gun === 'null') return;
	mp.console.logInfo(`UseGUN!? ${gun}`);
	Player.giveWeapon(mp.game.joaat(gun), 100, true);
};

useGun('null');
mp.events.add('useItem', (id: number, name: string, description: string) => {
	// const newItems = JSON.parse(useItems);
	// console.log(newItems.name);s
	mp.console.logInfo(`useItem: ${name}`);
	// mp.console.logInfo('For Item');
	// mp.console.logInfo(`Prop: ${id}`);
	mp.console.logInfo(`Func: ${items[id].func}`);
	const func: any = new Function(items[id].func);
	func();
	// eval(items[id - 1].func);
});

mp.events.add('sendItems', (getItems: Items[]) => {
	mp.console.logInfo(`Item: ${getItems[0].name}`);
	items = getItems;
	for (let i = 1; i < 22; i++) {
		const { id, name, image, func } = getItems[i];
		browser.execute(`trigger('addItem','${JSON.stringify({ id, name, image, func })}')`);
	}
});

mp.events.add('addPlayers', (id, name, scid) => {
	browser.execute(`trigger('insert','${JSON.stringify({ id, name, rgscid: scid })}')`);
	// mp.console.logInfo(`TriggerFunc: ${JSON.stringify({ id, name, rgscid: scid })}`);
	// trigger('insert', {id, name, scid});
});

mp.events.add('spawnVehicle', async (vehicle) => {
	if (!mp.game.streaming.isModelAVehicle(mp.game.joaat(vehicle))) {
		mp.gui.chat.push(`${colors.error}[Error]${colors.white} Vehicle not found${colors.error} ${vehicle}`);
	} else {
		const veh = mp.vehicles.new(mp.game.joaat(vehicle), Player.position);
		while (!veh.handle) await mp.game.waitAsync(0);
		Player.setIntoVehicle(veh.handle, -1);
		mp.gui.chat.push(`${colors.success}[Success]${colors.white} Vehicle spawned${colors.success} ${vehicle}`);
	}
});
