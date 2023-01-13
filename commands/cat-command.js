const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { request } = require('undici');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cat')
		.setDescription('Replies with cat image!'),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });

		const catResult = await request("https://aws.random.cat/meow");
		const { file } = await catResult.body.json();

		const embedWithAnImage = new EmbedBuilder()
			.setTitle('Aww cute cat <3')
			.setImage(file);
		
		interaction.editReply({ embeds: [embedWithAnImage] });
	},
};