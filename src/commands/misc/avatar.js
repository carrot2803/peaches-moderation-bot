const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get user avatar')
        .addUserOption(option => option.setName('target').setDescription('The user to get avatar from')),
    
    async execute(interaction) {
        const user = interaction.options.getUser('target') || interaction.user;
        const avatar = user.displayAvatarURL({ format: 'png', size: 2048 });
        const embed = {
            title: `${user.username}'s avatar`,
            image: { url: avatar },
            color: 1752220,
            timestamp: new Date()
        };

        return interaction.reply({ embeds: [embed]});
    }
};
