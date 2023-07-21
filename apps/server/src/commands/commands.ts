import { colors } from '@ziim/shared/utils';

mp.events.addCommand('hp', (player) => {
	console.log('Setting H!');
	player.health = 100;
	player.call('addPlayers', [player.id, player.name, player.rgscId]);
});

mp.events.addCommand('armor', (player) => {
	player.armour = 100;
});

mp.events.addCommand('kill', (player) => {
	player.health = 0;
	player.outputChatBox('Killing yourself.');
});

mp.events.addCommand('car', (player, _, car) => {
	player.call('spawnVehicle', [car]);
});

mp.events.addCommand('repair', (player) => {
	const veh = player.vehicle || false;
	if (!veh) return;
	player.outputChatBox(`Repearing vehicle!`);
	veh.repair();
});

mp.events.addCommand('id', (player) => {
	const id = player.id;
	player.outputChatBox(`ID: ${colors.error} ${id}`);
	console.log('Check ID!?!?');
	player.call('checkid', [player]);
});

mp.events.addCommand('insert', (player) => {
	mp.players.forEach((_player) => {
		_player.call('addPlayers', [player.id, player.name, player.rgscId]);
		_player.call('maxPlayers', [mp.config.maxplayers]);
		_player.call('localPlayers', [mp.players.toArray().length]);
	});
});
