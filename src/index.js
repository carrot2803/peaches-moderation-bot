const { REST, Routes } = require('discord.js');
const client = require('./client');
const { clientId, token } = require('../config.json');

const rest = new REST().setToken(token);
const commands = client.commands.map(command => command.data.toJSON());

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
		await rest.put(Routes.applicationCommands(clientId), { body: commands });
		console.log(`Successfully reloaded ${commands.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();
