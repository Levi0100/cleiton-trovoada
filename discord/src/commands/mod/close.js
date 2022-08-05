import {Command, Embed} from '../../structures/index.js'
import {User} from '../../../../database/index.js'

export default class CloseCommand extends Command {
    constructor() {
        super({
            name: 'close',
            aliases: ['fechar'],
            category: 'mod'
        });
    }
    async run(message) {
        var member = this.getMember(message.args[0]);
        if(!member) return message.reply('invalidMember');
        const user = await User.findById(member.id);
        if(!user || !user.ticketOpened) return message.reply('noTicket', {user: member.mention});
        message.guild.channels.get(user.ticketOpened).editPermission(member.id, 0, 1024, 1, `Ticket fechado por ${message.author.username}`)
        .then(() => {
            var channel = message.guild.channels.get(user.ticketOpened);
            const embed = new Embed();
            embed.setDescription(`Ticket fechado por ${message.author.username}`);
            channel.createMessage(embed.build());
            message.delete();
        });
    }
}