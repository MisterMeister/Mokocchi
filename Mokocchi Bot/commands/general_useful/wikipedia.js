const wiki = require('wikipedia');
const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;


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
    var page; 
	try {
		page = await wiki.page(searchTerm);
	} catch (error) {
        pageFound = false; 
	}

    await interaction.deferReply();

    if(pageFound) {
		const summary = await page.summary();
		await interaction.editReply(summary.extract);
    } else {
        await interaction.editReply("No page exists with that name")
    }
})();
        
	},
};