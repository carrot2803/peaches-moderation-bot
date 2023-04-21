const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');
const { Key } = require('../../../config.json');

const configuration = new Configuration({
    apiKey: Key
});

const openai = new OpenAIApi(configuration)

module.exports = {
    data: new SlashCommandBuilder()
        .setName('peachesai').setDescription('Ask me a question')
        .addStringOption(option => option.setName('question').setDescription(`This is the question for the ai`).setRequired(true))
        .setDMPermission(false),

    async execute(interaction) {
        await interaction.deferReply();
        const question = interaction.options.getString('question');

        try {
            const res = await openai.createCompletion({
                model: 'text-davinci-003',
                max_tokens: 2048,
                temperature: 0.5,
                prompt: question
            })
            const embed = new EmbedBuilder()
                .setColor('Aqua')
                .setDescription(`\`\`\`${res.data.choices[0].text}\`\`\``)

            await interaction.editReply({ embeds: [embed] });
        }
        catch (e) {
            return await interaction.editReply({ content: `Requested failed with status code **${e.response.status}**`, ephemeral: true })
        }
    }
}