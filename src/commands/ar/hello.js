const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('greeting')
		.setDescription('Replies with Hello'),
	async execute(interaction) {
		return interaction.reply("Hello");
	},
};