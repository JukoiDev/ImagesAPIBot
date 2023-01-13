const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { request } = require('undici');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fox')
		.setDescription('Replies with fox image! <3'),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });

		const foxResult = await request('https://randomfox.ca/floof/');
		const { image } = await foxResult.body.json();

		const embedWithAnImage = new EmbedBuilder()
			.setTitle('Aww cute fox <3')
			.setImage(image);
		
		interaction.editReply({ embeds: [embedWithAnImage] });
	},
};