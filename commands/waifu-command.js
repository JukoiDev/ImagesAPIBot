const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');
const { request } = require('undici');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('waifu')
		.setDescription('Replies with Waifu picture! Tag is required')
		.addStringOption(options  =>
			options
				.setName('tags')
				.setDescription('The tags needed for searching:')
				.setRequired(true))
		.addStringOption(options =>
			options
				.setName('gifs')
				.setDescription('Allow GIFs?')
				.setRequired(true)
				.addChoices(
					{ name: 'Allow', value: 'true' },
					{ name: 'Disallow', value: 'false' },
				))
		.addStringOption(options =>
			options
				.setName('nsfw')
				.setDescription('Allow NSFW searches?')
				.setRequired(true)
				.addChoices(
					{ name: 'Allow', value: 'true' },
					{ name: 'Disallow', value: 'false' },
				)),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });

		const waifuResult = await request(`https://api.waifu.im/search/?included_tags=${interaction.options.getString('tags')}&gif=${interaction.options.getString('gifs')}&is_nsfw=${interaction.options.getString('nsfw')}`);
		const { images } = await waifuResult.body.json();

		const embedWithAnImage = new EmbedBuilder()
			.setTitle(`Source: ${images[0]["source"]}`)
			.setImage(images[0]["url"])
			.setColor(images[0]["dominant_color"]);
		
		interaction.editReply({ embeds: [embedWithAnImage] });
	},
};