const turl = require('turl');
const { SlashCommandBuilder } = require('discord.js');
// const { inviteLink } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Sends the bot ionvite link for Mokocchi'),
	async execute(interaction) {
        const inviteLink = "https://discord.com/api/oauth2/authorize?client_id=1118382149368807496&permissions=8&scope=applications.commands%20bot"
        const res = turl.shorten(inviteLink)
        .then((res) => {
            console.log(res);
            interaction.reply(res);
        }).catch((err) => {
            console.log(err);
        });
        console.log(res);
	},
};
