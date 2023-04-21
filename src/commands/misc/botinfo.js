const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription("Gives peaches' information"),

    async execute(interaction, client){
        const name = "peaches";
        const icon = `${client.user.displayAvatarURL()}`;
        let serverCount = await client.guilds.cache.reduce((a,b) => a+b.memberCount, 0);

        let totalSeconds = client.uptime / 1000;
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds/3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        let uptime = `${days} days, ${hours} hours, ${minutes} minutes & ${seconds} seconds`;
        let ping = `${Date.now() - interaction.createdTimestamp}ms.`;

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel(`Our Server`)
            .setStyle(ButtonStyle.Link)
            .setURL(`https://discord.gg/TFEbHkCyT3`),

            new ButtonBuilder()
            .setLabel(`Bot Invite`)
            .setStyle(ButtonStyle.Link)
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=888425676280062003&permissions=8&scope=bot`)
        )

        const embed = new EmbedBuilder()
        .setColor('Aqua')
        .setAuthor({ name: name, iconURL: icon })
        .setThumbnail(`${icon}`)
        .setFooter({ text: "Bot ID: 888425676280062003"})
        .addFields({ name: "Server Numbers", value: `${client.guilds.cache.size}`, inline: true})
        .addFields({ name: "Server Members", value: `${serverCount}`, inline: true})
        .addFields({ name: 'Latency', value: `${ping}`, inline:true})
        .addFields({ name: "Uptime", value: `\`\`\`${uptime}\`\`\``})

        await interaction.reply({ embeds: [embed], components: [row]});
    }
}