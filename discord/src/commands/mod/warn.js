import {Command, Embed} from '../../structures/index.js'
import {Guild} from '../../../../database/index.js'

export default class WarnCommand extends Command {
    constructor(client) {
        super({
            name: 'warn',
            aliases: ['w', 'avisar'],
            category: 'mod',
            client
        });
    }
    async run(message) {
        const member = this.getMember(message.args[0]);
        const guild = await Guild.findById(message.guild.id);
        if(!member) return message.reply('invalidMember');
        const reason = message.args.slice(1).join(' ');
        if(!reason) return message.reply('noReason');

        const embed = new Embed();
        embed.setAuthor(`Caso #${guild.cases + 1} | Avisado`, member.avatarURL);
        embed.addField('Usuário', member.mention, true);
        embed.addField('Martelado por', message.author.mention, true);
        embed.addField('Motivo', reason, true);
        embed.setFooter(`ID: ${member.user.id}`);
        this.client.getChannel(process.env.modlog).createMessage(embed.build(member.mention));

        message.delete();
        message.channel.createMessage('warnedSuccessfully', {user: `${member.username}#${member.discriminator}`});
        guild.cases += 1
        guild.save();
    }
}