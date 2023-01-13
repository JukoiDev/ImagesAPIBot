const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Replies with help message'),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });

		const embedWithAnImage = new EmbedBuilder()
			.setTitle('ImagesAPIBot / NekoBot HELP EMBED')
			.setAuthor({ name: 'Awli' })
			.setDescription('Spis Komend S.A.')
			.setColor("#333333")
			.setTimestamp()
			.addFields(
				{ name: '/fox', value: 'Displays fox images', inline: true },
				{ name: '/cat', value: 'Displays cat images', inline: true },
				{ name: '/waifu', value: 'Displays waifu images', inline: true },
				{ name: '/help', value: 'You just used it!!!', inline: true },
			);
		
		interaction.editReply({ embeds: [embedWithAnImage] });
	},
};