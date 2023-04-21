const { SlashCommandBuilder } = require('discord.js');

module.exports  = {
    data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clears up to 99 messages <3')
    .addIntegerOption(option => option.setName('amount').setDescription('Number of messages to delete')),

    async execute(interaction){
        const amount = interaction.options.getInteger('amount');
        if(amount < 1 || amount > 99 ) return interaction.reply({
            content: `You need to input a number of 1 to 99.`, ephemeral: true 
        });

        await interaction.channel.bulkDelete(amount,true).catch(error => {
            console.error(error);
            interaction.reply({content: 'Error trying to clear messages', ephemeral: true});
        });

        return interaction.reply({content: `I cleared \`${amount}\` messages`, ephemeral: true})
    },
};