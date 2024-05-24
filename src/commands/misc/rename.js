const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("rename")
		.setDescription(
			"Renames a channel by removing the first two letters of its current name."
		)
		.addChannelOption((option) =>
			option
				.setName("target")
				.setDescription("The channel to rename")
				.setRequired(true)
		),

	async execute(interaction) {
		const channel = interaction.options.getChannel("target");

		if (channel.name.length <= 2) {
			return interaction.reply({
				content:
					"The channel name is too short to remove the first two letters.",
				ephemeral: true,
			});
		}

		// rename logic
		const newName = channel.name.substring(3);

		try {
			await channel.setName(newName);
			await interaction.reply({
				content: `Channel renamed to ${newName}.`,
				ephemeral: false,
			});
		} catch (error) {
			console.error(error);
			await interaction.reply({
				content: "An error occurred while renaming the channel.",
				ephemeral: true,
			});
		}
	},
};
