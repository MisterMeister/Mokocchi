const turl = require('turl');
const { SlashCommandBuilder } = require('discord.js');
// const { inviteLink } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Sends the bot ionvite link for Mokocchi'),
	async execute(interaction) {
        const inviteLink = "https://discord.com/api/oauth2/authorize?client_id=1118382149368807496&permissions=8&scope=applications.commands%20bot"
        turl.shorten(inviteLink).then((res) => {
            interaction.reply(res);
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
	},
};
