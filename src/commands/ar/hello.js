const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hi')
		.setDescription('Replies with Hello'),
	async execute(interaction) {
		return interaction.reply("Hello");
	},
};