const turl = require('turl');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shorten')
		.setDescription('Takes in an url that will be shortened')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('the unshortened url to be inputted')
                .setRequired(true)),
	async execute(interaction) {
        const unshortenedURL = interaction.options.getString("url");
        var isValidURL;
        try {
            new URL(unshortenedURL);
            isValidURL =  true;
        } catch (err) {
            isValidURL = false;
        }

        if(unshortenedURL.startsWith("https://tinyurl.com")) {
            isValidURL = false;
        }

        if(!isValidURL) {
            await interaction.reply("The inputted URL is not valid, please try again with a valid url");
        } else {
            const res = turl.shorten(unshortenedURL)
            .then((res) => {
                interaction.reply(res);
            }).catch((err) => {
                console.log(err);
            });
        }
	},
};
