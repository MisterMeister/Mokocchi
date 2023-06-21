const turl = require('turl');
const { SlashCommandBuilder } = require('discord.js');
const { inviteLink } = require('./config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Sends the bot ionvite link for Mokocchi'),
	async execute(interaction) {
        turl.shorten(inviteLink).then((res) => {
            interaction.reply(res);
        }).catch((err) => {
            console.log(err);
        });
	},
};
