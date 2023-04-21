const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mute').setDescription('Mute a member in the server.')
		.addUserOption(option => option.setName('target').setDescription('The member to mute.').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('Reason for the mute.')),

	async execute(interaction) {
		if (!interaction.member.permissions.has('MUTE_MEMBERS')) 
			return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });

		const member = interaction.options.getMember('target');
		if (!member) 
			return interaction.reply({ content: 'Could not find the specified member.', ephemeral: true });

		if (!member.manageable) 
			return interaction.reply({ content: 'I cannot mute this member.', ephemeral: true });

		const reason = interaction.options.getString('reason') || 'No reason provided.';
		const mutedRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');
		if (!mutedRole) 
			return interaction.reply({ content: 'The muted role does not exist.', ephemeral: true });
	
		await member.roles.add(mutedRole, `Muted by ${interaction.user.tag} for ${reason}`);
		return interaction.reply({ content: `Muted ${member.user.tag}.`, ephemeral: false });
	},
};
