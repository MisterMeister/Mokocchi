const { SlashCommandBuilder } = require('discord.js');

var second = 1000
var minute = second*60
var hour = minute*60
var day = hour*24
var week = day*7
var year = day*365

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mute')
		.setDescription('mutes a member for a given amount of time')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('the user to be muted')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('unit')
            .setDescription('the unit of time (example: s, m, h, w, d, y)')
            .setRequired(true))
        .addNumberOption(option =>
            option.setName("duration")
            .setDescription("amount of time you want to mute that person for")
            .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
            .setDescription('reason for the mute')
            .setRequired(false)),
            
	async execute(interaction) {

        const guildOfMute = interaction.guild;
        const mutedUser = interaction.options.getMember("user");

        var muteUnit = interaction.options.getString("unit");
        var muteTime = interaction.options.getNumber("duration")
        var muteReason = interaction.options.getString("reason");

        muteTime = muteTime.toString().toLowerCase(); 

        try {  

            var increment = 0;

            if((muteUnit !== 's') && (muteUnit !== 'm') && (muteUnit !== 'h')
            && (muteUnit !== 'd') && (muteUnit !== 'w')) {
                // invalid measurement
                interaction.reply("#ERROR: Invalid unit, must be s/m/h/d/w")
            } else {

                if(muteUnit === 's') {
                    increment = second;
                } else if(muteUnit === "m") {
                    increment = minute; 
                } else if(muteUnit === "h") {
                    increment = hour;
                } else if(muteUnit === "d") {
                    increment = day;
                } else if(muteUnit === "w") {
                    increment = week;
                } 

                if((muteTime < 0) || (muteTime > Number.MAX_VALUE) ) {
                    // invalid time
                    interaction.reply("#ERROR: Invalid time, must be a valid integer from 0 to max value")
                } else {

                    console.log(`Can the bot mute: ${mutedUser.moderatable}`)

                    if(!mutedUser.moderatable) {
                        interaction.reply("#ERROR: You/Bot lacks permissions to timeout")
                    } else {
                    if((muteTime * increment > 28*day)) {
                        interaction.reply("#ERROR: You cannot timeout someone for more than 28 days")
                    } else {
                        try {
                            var mutedMember = guildOfMute.members.resolve(mutedUser)
                            if(muteReason == null) {
                                muteReason = "No reason provided"
                            }
                            mutedMember.timeout(muteTime * increment, muteReason)
                            interaction.reply(`${mutedUser.user.username} has been muted for ${muteTime} ${muteUnit}`)
                        } catch (err) {
                            console.log(err)
                        }
                    }
                }
            }
        }

        } catch (err) {
            console.log(err)
        }
        

	},
};
