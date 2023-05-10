const { SlashCommandBuilder } = require('discord.js');

let roleName = '';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('auto-role')
        .setDescription('Set a role for auto-role')
        .addRoleOption(option => option.setName('role').setDescription('Role to set for auto-role')),
    async execute(interaction) {
        const role = interaction.options.getRole('role');
        roleName = role ? role.name : 'vegetables';
        await interaction.reply({ content: `Auto-role set to ${roleName}`, ephemeral: false });
    },
    getroleName() {
        return roleName;
    }
};