const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('usun')
    .setDescription('usuń daną liczbę wiadomości na kanale!')
    .addNumberOption(option => 
        option.setName('ilość')
        .setDescription('ilość wiadomości do usunięcia')
        .setRequired(true)
        )
        .addUserOption(option => 
            option
            .setName('użytkownik')
            .setDescription('Usuń wiadomości danego użytkowinka!')
            .setRequired(false)
            ),
    async execute(interaction) {
       
        const {channel, options } = interaction;

        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return interaction.reply({content: 'Nie masz permisji ```MANAGE_MESSAGES```', ephemeral: true});

        const deleteAmount = options.getNumber('ilość');
        const Target = options.getMember('użytkownik');

        const Messages = await channel.messages.fetch();

        if(isNaN(deleteAmount)) return;


        let Response = new MessageEmbed()
        .setColor("BLURPLE")

        if(deleteAmount > 100) return;
        if(deleteAmount < 1) return;

        if(Target){
            let i = 0;
            const filtered = [];
            (await Messages).filter((m) => {
                if(m.author.id === Target.id && i < deleteAmount){
                    filtered.push(m);
                    i++
                }
                
            });

            channel.bulkDelete(filtered, true).then(msg => {
                Response.setTitle('Udało się usunąć wiadomości!');
                Response.setDescription(`🧹 Usunięto ${msg.size} wiadomości od ${Target}! 🧹`)
                interaction.reply({embeds: [Response]})
            })
        } else {
            channel.bulkDelete(deleteAmount, true).then(msg => {
                Response.setTitle('Udało się usunąć wiadomości!');
                Response.setDescription(`🧹 Usunięto ${msg.size} wiadomości! 🧹`)
                interaction.reply({embeds: [Response]})
            });
        }

        
    }
}