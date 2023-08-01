const { SlashCommandBuilder, BanOptions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban an user')
        .addUserOption(option =>
            option.setName("user")
            .setDescription("the user to be banned")
            .setRequired(true))
        .addStringOption(option =>
            option.setName("reason")
            .setDescription("reason for the ban")
            .setRequired(false)),
	async execute(interaction) {

        try{

            const guildOfBan = interaction.guild;

            const userToBeBanned = interaction.options.getMember("user"); 
            const bannedMemberUsername = userToBeBanned.user.username;

            console.log(interaction.member.permissions)

            console.log(`is the user bannable: ${userToBeBanned.moderatable}`)
            var banPerms = true;
            var banReason = interaction.options.getString("reason");
            console.log(banReason)


            try {
                banPerms = interaction.member.permissions.any("BanMembers");
            } catch(err) {
                banPerms = false; 
            }
            console.log(`can you ban: ${banPerms}`)

            if(banReason === null) {
                banReason = "No reason provided"
            }
            if((userToBeBanned.bannable) && (banPerms)) {
                guildOfBan.members.ban(userToBeBanned, {
                    reason: `${banReason}`
                })
                await interaction.reply(`${bannedMemberUsername} has been banned`)
            } else {
                if(!userToBeBanned.bannable) {
                    await interaction.reply(`#ERROR: ${bannedMemberUsername} cannot be banned by Mokocchi Bot (Bot has lower hierarchy)`)
                } else {
                    await interaction.reply("#ERROR: You cannot ban a member above you/You lack ban permissions")
                }
            }
            
        } catch(err) {
            console.log(err)
        }

        
	},
};
