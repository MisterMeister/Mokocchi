const { SlashCommandBuilder, BanOptions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('play a song in a vc you are in')
        .addStringOption(option =>
            option.setName("song")
            .setDescription("the yt link to be played")
            .setRequired(true)),

	async execute(interaction) {

        var channel = interaction.member.voice.channelId

        console.log(`__________________________________________________voice:${channel}`)

        if(!channel) {
            interaction.reply(`"#ERROR: You must be in a voice channel in order to play music" ${channel}`)
        } else {
            interaction.reply(`Now playing '${interaction.options.getString("song")}, status: ${channel}'`)
        }


        // if(!interaction.member)

    }
}