const wiki = require('wikipedia');
const { ActionRowBuilder, StringSelectMenuBuilder, SlashCommandBuilder, StringSelectMenuOptionBuilder, ComponentType } = require('discord.js');
const { EmbedBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('wikipedia')
		.setDescription('Searches a query in wikipedia')
        .addStringOption(option =>
            option.setName('term')
                .setDescription('the search term')
                .setRequired(true)),
	async execute(interaction) {
        var pageFound = true;
        const searchTerm = interaction.options.getString('term');

(async () => {

	await interaction.deferReply();

    var page; 

	var currentPageIsSummary;

	const select = new StringSelectMenuBuilder()
	.setCustomId("options")
	.addOptions(
		new StringSelectMenuOptionBuilder()
		.setLabel('Summary')
		.setDescription('Summary of the article in wikipedia')
		.setValue('summary'),
		new StringSelectMenuOptionBuilder()
		.setLabel('Suggestions')
		.setDescription('Other possible search results')
		.setValue('suggestions')
	)
	try {
		page = await wiki.page(searchTerm);
	} catch (error) {
        pageFound = false; 
	}

    if(pageFound) {
		const summary = await page.summary();
        var summaryEmbed = new EmbedBuilder()
	.setTitle(summary.title)
	.setURL(summary.content_urls.desktop.page)
	.setDescription(summary.extract)

	var newEmbed = new EmbedBuilder() 
	.setTitle("new embed")

	const row = new ActionRowBuilder()
	.addComponents(select)

	if (typeof summary.thumbnail != "undefined") {
		// object exists 
		summaryEmbed.setImage(summary.thumbnail.source);
	} 
		//await interaction.editReply(summary.extract);
    const response = await interaction.editReply({
		embeds: [summaryEmbed],
		components: [row],
	});
	currentPageIsSummary = true; 

	var collector; 
	try {
		collector = response.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 3_600_000 });
	} catch(err) {
		console.log(err);
	}

	collector.on('collect', async i => {
		const selection = i.values[0];

		if((selection == "summary") && (!currentPageIsSummary)) {
			await interaction.editReply({
				embeds: [newEmbed],
				components: [row],
			});
		} else if(selection == "suggestions") {
			currentPageIsSummary = false; 
			await interaction.editReply({
				embeds: [newEmbed],
				components: [row],
			});
		}
	});	

    } else {
        await interaction.editReply("No page exists with that name")
    }
})();
        
	},
};