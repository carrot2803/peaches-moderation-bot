const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unmute').setDescription('Unmutes a member of the server')
		.addUserOption(option => option.setName('target').setDescription('Member to unmute').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('Reason for unmute')),

	async execute(interaction) {
		if (!interaction.member.permissions.has('MUTE_MEMBERS')) 
			return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
		
		const member = interaction.options.getMember('target');
		if (!member) 
			return interaction.reply({ content: 'Could not find the specified member.', ephemeral: true });
		
		if (!member.manageable) 
			return interaction.reply({ content: 'I cannot unmute this member.', ephemeral: true });

		const reason = interaction.options.getString('reason') || 'No reason provided.';
		const mutedRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');
		if (!mutedRole) 
			return interaction.reply({ content: 'The muted role does not exist.', ephemeral: true });

		await member.roles.remove(mutedRole, `Unmuted by ${interaction.user.tag} for ${reason}`);
		return interaction.reply({ content: `Unmuted ${member.user.tag}.`, ephemeral: false });
	},
};
