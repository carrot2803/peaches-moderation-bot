const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("warn")
		.setDescription("Warns a user with a reason.")
		.addUserOption((option) => option.setName("user").setDescription("The user to warn").setRequired(true))
		.addStringOption((option) => option.setName("reason").setDescription("The reason for warning the user")),
	async execute(interaction, client) {
		const user = interaction.options.getUser("user");
		const reason = interaction.options.getString("reason") || "No reason provided";

		// Check if the user has permission to use the command
		if (!interaction.member.permissions.has("KICK_MEMBERS")) {
			return interaction.reply({ content: "You do not have permission to use this command.", ephemeral: true });
		}

		// Warn the user and log the warning
		try {
			await user.send(`You have been warned in ${interaction.guild.name} for the following reason: ${reason}`);
			interaction.reply(`${user.tag} has been warned for the following reason: ${reason}`);
			console.log(`${user.tag} has been warned by ${interaction.user.tag} for: ${reason}`);
		} catch (error) {
			console.error(error);
			interaction.reply({
				content: "Could not warn the user. Make sure they have DMs enabled.",
				ephemeral: true,
			});
		}
	},
};
