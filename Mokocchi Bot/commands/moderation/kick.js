const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick an user')
        .addUserOption(option =>
            option.setName("user")
            .setDescription("the user to be kicked")
            .setRequired(true))
        .addStringOption(option =>
            option.setName("reason")
            .setDescription("reason for the kick")
            .setRequired(false)),
	async execute(interaction) {

        try{

            const guildOfKick = interaction.guild;

            const userToBeKicked = interaction.options.getMember("user"); 
            const kickedMemberUsername = userToBeKicked.user.username;

            console.log(interaction.member.permissions)

            console.log(`is the user kickable: ${userToBeKicked.moderatable}`)
            var kickPerms = true;
            var kickReason = interaction.options.getString("reason");
            console.log(kickReason)


            try {
                kickPerms = interaction.member.permissions.any("KickMembers");
            } catch(err) {
                kickPerms = false; 
            }
            console.log(`can you kick: ${kickPerms}`)

            if(kickReason === null) {
                kickReason = "No reason provided"
            }
            if((userToBeKicked.kickable) && (kickPerms)) {
                guildOfKick.members.kick(userToBeKicked, {
                    reason: `${kickReason}`
                })
                await interaction.reply(`${kickedMemberUsername} has been kicked`)
            } else {
                if(!userToBeKicked.kickable) {
                    await interaction.reply(`#ERROR: ${kickedMemberUsername} cannot be kicked by Mokocchi Bot (Bot has lower hierarchy)`)
                } else {
                    await interaction.reply("#ERROR: You cannot kick a member above you/You lack kick permissions")
                }
            }
            
        } catch(err) {
            console.log(err)
        }

        
	},
};
