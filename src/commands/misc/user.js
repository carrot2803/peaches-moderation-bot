const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('user').setDescription("Gets basic user info")
    .addUserOption(option => option.setName('user').setDescription("user to get info on").setRequired(false)),

    async execute (interaction){
        const user = interaction.options.getUser('user') || interaction.user;
        const member = await interaction.guild.members.fetch(user.id);
        const icon = user.displayAvatarURL();
        const tag = user.tag;

        const embed = new EmbedBuilder()
        .setColor("Aqua")
        .setAuthor({ name: tag, iconURL: icon})
        .setThumbnail(icon)
        .addFields({ name: "Member", value: `${user}`, inline: false})
        .addFields({ name: "Roles", value: `${member.roles.cache.map(r=>r).join(` `)}`,inline: false})
        .addFields({ name: 'Joined Server', value: member.joinedAt.toLocaleDateString('en-US'), inline: true })
        .addFields({ name: 'Joined Discord', value: user.createdAt.toLocaleDateString('en-US'), inline: true })
        .setFooter({ text: `User ID: ${user.id}`})
        .setTimestamp()

        await interaction.reply({ embeds: [embed]});
    }
}

