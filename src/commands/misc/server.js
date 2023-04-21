const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('server').setDescription('Display server info'),

    async execute(interaction) {
		const { guild } = interaction;
		const { name, ownerId, createdTimestamp, memberCount } = guild;
		const icon = guild.iconURL() || `https://preview.redd.it/ar5uib7smk291.jpg?width=640&crop=smart&auto=webp&s=bbaf1174a8b55196e8e22b0e6ec0e9ac9a992235`;
		const roles = guild.roles.cache.size;
		const emojis = guild.emojis.cache.size;
		const id = guild.id;
	
		let baseVerification = guild.verificationLevel;
		baseVerification = baseVerification == 0 ? "None" : baseVerification == 1 ? "Low" : baseVerification == 2 ? "Medium" : baseVerification == 3 ? "High" : "Very High";
	
		const createdDate = new Date(createdTimestamp).toLocaleString('en-US', {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			hour12: true
		});
			  
		const embed = new EmbedBuilder()
			.setColor("Aqua").setThumbnail(icon)
			.setAuthor({ name: name, iconURL: icon })
			.setFooter({ text: `Server ID: ${id}`})
			.setTimestamp()
			// .addFields({ name: "Name", value: `${name}`, inline: false})
			.addFields({ name: "Owner", value: `<@${ownerId}>`, inline: true})
			.addFields({ name: "Members", value: `${memberCount}`, inline: true})
			.addFields({ name: "Date created", value: `${createdDate}`, inline: true})
			.addFields({ name: "Role Number", value: `${roles}`, inline: true})
			.addFields({ name: "Emoji Number", value: `${emojis}`, inline: true})
			.addFields({ name: "Server Boosts", value: `${guild.premiumSubscriptionCount}`, inline: true})
			// .addFields({ name: "Verification Level", value: `${baseVerification}`, inline: true})
	
		await interaction.reply({ embeds: [embed] });
	}
};	