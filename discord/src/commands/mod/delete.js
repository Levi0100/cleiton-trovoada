import {Command} from '../../structures/index.js'
import {User} from '../../../../database/index.js'

export default class CloseCommand extends Command {
    constructor() {
        super({
            name: 'delete',
            aliases: ['deletar', 'del'],
            category: 'mod'
        });
    }
    async run(message) {
        var member = this.getMember(message.args[0]);
        if(!member) return message.reply('invalidMember');
        const user = await User.findById(member.id);
        if(!user || !user.ticketOpened) return message.reply('noTicket', {user: member.mention});
        message.reply('ticketWillBeDeleted');
        setTimeout(() => {
            message.guild.channels.get(user.ticketOpened).delete(`Ticket encerrado por ${message.author.username}`);
            user.ticketOpened = null;
            user.save();
        }, 10000);
    }
}