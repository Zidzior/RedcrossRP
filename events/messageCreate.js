module.exports = {
    name: "messageCreate",
    async execute(message) {
        if (message.author.bot) return;
        if (!message.guild) return;
        if (!message.member) message.member = await message.guild.fetchMember(message);
    
    }
}