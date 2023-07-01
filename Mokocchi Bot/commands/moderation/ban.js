const { SlashCommandBuilder } = require('discord.js');
// const { inviteLink } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban an user')
        .addUserOption(option =>
            option.setName("user")
            .setDescription("the user to be banned")
            .setRequired(true)),

	async execute(interaction) {

        try{
            const userToBeBanned = interaction.options.getUser("user"); 
            console.log(userToBeBanned.id)
            await interaction.reply("testing")
        } catch(err) {
            console.log(err)
        }

        
	},
};
