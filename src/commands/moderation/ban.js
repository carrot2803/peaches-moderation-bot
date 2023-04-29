const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Select a member and ban them')
		.addUserOption(option => option.setName('target').setDescription('The member to ban').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the ban')),

	async execute(interaction) {
		const member = interaction.options.getMember('target');
		const reason = interaction.options.getString('reason') || 'No reason provided';
		
		if (!member.bannable) return interaction.reply({ content: `I cannot ban ${member.user.username}.`, ephemeral: false });
		
		await member.ban({ reason });
		return interaction.reply({ content: `Banned: ${member.user.username}. Reason: ${reason}`, ephemeral: false });
	},
};
