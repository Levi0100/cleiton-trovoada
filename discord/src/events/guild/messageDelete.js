import {Event, Embed} from '../../structures/index.js'

export default class MessageDeleteEvent extends Event {
    constructor(client) {
        super({name: 'messageDelete', client});
    }
    async run(message) {
        if(!message?.content) return;
        if(message.author.id === '827644306444517417') return;
        const embed = new Embed();
        embed.setTitle('NOVA MENSAGEM DELETADA');
        embed.setDescription(`${message.author.mention} deletou uma mensagem em ${message.channel.mention}`);
        embed.setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL);
        embed.addField('Conteúdo da Mensagem', message.content);
        embed.setFooter(message.author.id);
        embed.setColor('ff0000');
        this.client.getChannel('989319274034249788').createMessage(embed.build());
    }
}