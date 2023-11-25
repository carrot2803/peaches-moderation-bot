const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays a list of available commands.'),
    execute(interaction, client) {
        const commands = client.commands.map(command => command.data.toJSON());
        const commandList = commands.map(command => `- \`${command.name}\`: ${command.description}`).join('\n');

        const embed = {
            color: parseInt('0099ff', 16), // convert hex code to integer
            title: 'Available Commands',
            description: commandList,
            footer: {
                text: "carrot Bot"
            }
        };

        interaction.reply({ embeds: [embed] });
    },
};
