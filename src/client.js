const fs = require("node:fs"),
	path = require("node:path");
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const autoRoleCommand = require("./commands/moderation/auto-role");
const { token } = require("../config.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
client.commands = new Collection();
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

commandFolders.forEach((folder) => {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));
	commandFiles.forEach((file) => {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ("data" in command && "execute" in command) client.commands.set(command.data.name, command);
		else console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	});
});

client.once(Events.ClientReady, () => {
	console.log(`${client.user.tag} is ready`);
	client.guilds.cache.forEach((guild) => {
		console.log(`${guild.name} (id: ${guild.id})`);
	});
	client.user.setActivity("/help for more info");
});

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;
	try {
		await command.execute(interaction, client);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred)
			await interaction.followUp({
				content: "There was an error while executing this command!",
				ephemeral: true,
			});
		else await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
	}
});

client.on(Events.GuildMemberAdd, (member) => {
	console.log(`New member joined: ${member.user.tag}`);
	const roleName = autoRoleCommand.getroleName();
	const role = member.guild.roles.cache.find((r) => r.name === roleName);
	if (role)
		member.roles
			.add(role)
			.then(() => console.log(`Added role ${role.name} to ${member.user.tag}`))
			.catch(console.error);
	else console.log(`Could not find role ${roleName}`);
});

client.login(token);
module.exports = client;
