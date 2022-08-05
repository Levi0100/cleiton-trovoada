import {Command, Embed} from '../../structures/index.js'
import {Guild} from '../../../../database/index.js'

export default class KickCommand extends Command {
    constructor(client) {
        super({
            name: 'kick',
            aliases: ['k', 'vaza', 'xispa'],
            category: 'mod',
            client: client
        });
    }
    async run(message) {
        const guild = await Guild.findById(message.guild.id);
        const member = this.getMember(message.args[0]);
        if(!member) return message.reply('invalidMember');
        const reason = message.args.slice(1).join(' ');
        if(!reason) return message.reply('noReason');

        const embed = new Embed();
        embed.setAuthor(`Caso #${guild.cases + 1} | Expulso`, member.avatarURL);
        embed.addField('Usuário', member.mention, true);
        embed.addField('Martelado por', message.author.mention, true);
        embed.addField('Motivo', reason);
        embed.setFooter(`ID: ${member.id}`);
        this.client.getChannel(process.env.modlog)
        .createMessage(embed.build());

        guild.cases += 1
        guild.save();
        member.kick(reason);
        message.delete();
        message.channel.createMessage('kickedSuccessfully', {user: `${member.username}#${member.discriminator}`});
    }
}