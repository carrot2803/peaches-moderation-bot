const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unbans a member from the server')
        .addUserOption(option => option.setName('target').setDescription('Member to unban').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Reason for unban')),

    async execute(interaction) {
        const bannedUsers = await interaction.guild.bans.fetch();
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        if (!bannedUsers.has(target.id)) 
            return interaction.reply({ content: 'User is not currently banned.', ephemeral: true });

        await interaction.guild.members.unban(target.id, reason);
        return interaction.reply({ content: `Unbanned ${target.tag}. Reason: ${reason}`, ephemeral: false });
    },
};
