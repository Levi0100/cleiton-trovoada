import {Event, Embed} from '../../structures/index.js'

export default class MessageUpdateEvent extends Event {
    constructor(client) {
        super({name: 'messageUpdate', client});
    }
    async run(newMessage, oldMessage) {
        if(oldMessage?.content == newMessage?.content || !newMessage?.content) return;
        if(newMessage.author.bot) return;
        const embed = new Embed();
        embed.setTitle('NOVA MENSAGEM EDITADA');
        embed.setAuthor(`${newMessage.author.username}#${newMessage.author.discriminator}`, newMessage.author.avatarURL);
        embed.setDescription(`${newMessage.author.mention} editou uma mensagem em ${newMessage.channel.mention}`);
        embed.addField('Antiga Mensagem', oldMessage?.content);
        embed.addField('Nova Mensagem', newMessage?.content);
        embed.setFooter(newMessage.author.id);
        embed.setColor('#fff400');
        this.client.getChannel('989319274034249788').createMessage(embed.build());
    }
}