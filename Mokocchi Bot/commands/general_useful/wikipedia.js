const wiki = require('wikipedia');
const { SlashCommandBuilder } = require('discord.js');
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
		//await interaction.editReply(summary.extract);
        await interaction.editReply({embeds: [summaryEmbed]});
    } else {
        await interaction.editReply("No page exists with that name")
    }
})();
        
	},
};