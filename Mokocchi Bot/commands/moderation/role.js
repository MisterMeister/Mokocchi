const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('role')
		.setDescription('gives a member a certain role')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('the user the role to be given to')
                .setRequired(true))
        .addRoleOption(option =>
            option.setName('role')
            .setDescription('the role to be given')
            .setRequired(true)),

    async execute(interaction) {

        var roledMember = interaction.options.getMember("user");
        var role = interaction.options.getRole("role");

        console.log(`Can you add roles: ${interaction.member.permissions.any("ManageRoles")}`)
        if(!interaction.member.permissions.any("ManageRoles")) {
            interaction.reply("#ERROR: You do not have the permissions to manage roles")
        } else if(!roledMember.moderatable) {
            interaction.reply("#ERROR: Bot lacks permissions to manage roles")
        } else {
            try {
                roledMember.roles.add(role);
                interaction.reply(`${roledMember.user.username} has been given the role ${role}`)
            } catch(err) {
                console.log(err)
            }   
        }
    }
}

