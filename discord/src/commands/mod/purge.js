import {Command} from '../../structures/index.js'

export default class PurgeCommand extends Command {
    constructor() {
        super({
            name: 'purge',
            category: 'mod'
        });
    }
    async run(message) {
        var quantity = message.args[0];
        if(!quantity) return message.reply('messagesToBeDeleted');
        await message.delete();
        var deletedMessages = await message.channel.purge({
            limit: Number(quantity)
        });
        message.channel.createMessage(`Foram deletadas ${deletedMessages == 1 ? `${deletedMessages} mensagem` : `${deletedMessages} mensagens`} do chat por ${message.author.mention}`)
        .then(msg => {setTimeout(() => {msg.delete()}, 10000)});
    }
}