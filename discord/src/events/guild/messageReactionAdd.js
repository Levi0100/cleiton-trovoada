import {Event, Embed} from '../../structures/index.js'

export default class MessageReactionAddEvent extends Event {
    constructor(client) {
        super({
            name: 'messageReactionAdd',
            client
        });
    }
    async run(message, emoji) {
        var msg = await message.channel.getMessage(message.id);
        if(emoji.name == '⭐') {
            if(msg.reactions['⭐'].count >= 2) {
                const embed = new Embed();
                embed.setAuthor(msg.author.username, msg.author.avatarURL);
                embed.setDescription(msg.content);
                if(msg.attachments[0]) embed.addField('Arquivos anexados', `${msg.attachments.map(attachment => `▣ [${attachment.filename}](${attachment.url})`).join('\n')}`);
                embed.addField('Ir para a mensagem', `[Clique aqui](${msg.jumpLink})`);
                this.client.getChannel('871200264907010069')
                .createMessage(embed.build(`⭐ | ${message.channel.mention}`));
            }
        }
    }
}