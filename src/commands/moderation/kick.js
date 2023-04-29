const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick a member from the server.')
		.addUserOption(option => option.setName('target').setDescription('The member to kick.').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('The reason for the kick.')),
	async execute(interaction) {
		if (!interaction.member.permissions.has('KICK_MEMBERS')) 
			return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
		
		const member = interaction.options.getMember('target');
		if (!member.kickable) return interaction.reply({ content: 'I cannot kick this member.', ephemeral: true });
		
		const reason = interaction.options.getString('reason') || 'No reason provided.';
		await member.kick(reason);
		return interaction.reply({ content: `Kicked: ${member.user.username}\nReason: ${reason}`, ephemeral: false });
	},
};
