const { SlashCommandBuilder } = require('discord.js');

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

            const guildOfBan = interaction.guild;

            const userToBeBanned = interaction.options.getMember("user"); 
            const bannedMemberUsername = userToBeBanned.user.username;

            console.log(interaction.member.permissions)

            console.log(`is the user bannable: ${userToBeBanned.bannable}`)
            var banPerms = true;

            try {
                banPerms = interaction.member.permissions.any("BAN_MEMBERS");
            } catch(err) {
                banPerms = false; 
            }
            console.log(`can you ban: ${banPerms}`)
            if((userToBeBanned.bannable) && (banPerms)) {
                guildOfBan.members.ban(userToBeBanned)
                await interaction.reply(`${bannedMemberUsername} has been banned`)
            } else {
                if(!userToBeBanned.bannable) {
                    await interaction.reply(`#ERROR: ${bannedMemberUsername} cannot be banned by Mokocchi Bot (Bot has lower hierarchy)`)
                } else {
                    await interaction.reply("#ERROR: Invalid permissions (this command can only be used by guild members with ban permissions)")
                }
            }
            
        } catch(err) {
            console.log(err)
        }

        
	},
};
