const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slowmode')
        .setDescription('Set the slowmode of a channel')
        .addIntegerOption(option =>
            option.setName('duration')
                .setDescription('Time of the slow mode')
                .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel you want to set the slow mode of')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(false)
        ),

    async execute(interaction) {
        const { options } = interaction;
        const duration = options.getInteger('duration');
        const channel = options.getChannel('channel') || interaction.channel;
        const embed = new EmbedBuilder().setColor('Aqua');

        if (duration === 0) {
            channel.setRateLimitPerUser(0)
                .then(() => {
                    embed.setDescription(`:white_check_mark: Slowmode has been turned off in ${channel}.`);
                    interaction.reply({ embeds: [embed] });
                })
                .catch(error => {
                    console.error(error);
                    embed.setDescription(`:x: An error occurred while turning off slowmode in ${channel}.`);
                    interaction.reply({ embeds: [embed] });
                });
        }
        else {
            channel.setRateLimitPerUser(duration)
                .then(() => {
                    embed.setDescription(`:white_check_mark: ${channel} now has a ${duration} seconds **slowmode**`);
                    interaction.reply({ embeds: [embed] });
                })
                .catch(error => {
                    console.error(error);
                    embed.setDescription(`:x: An error occurred while setting slowmode in ${channel}.`);
                    interaction.reply({ embeds: [embed] });
                });
        }
    }
};
