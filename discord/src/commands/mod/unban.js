import {Command, Embed} from '../../structures/index.js'
import {Guild} from '../../../../database/index.js'

export default class BanCommand extends Command {
    constructor(client) {
        super({
            name: 'unban',
            aliases: ['unb', 'desbanir'],
            category: 'mod',
            client
        });
    }
    async run(message) {
        const user = await this.getUser(message.args[0]);
        if(!user) return message.reply('invalidUser');
        const guild = await Guild.findById('721384921679265833');
        var reason = message.args.slice(1).join(' ');
        if(!reason) return message.reply('noReason');

        message.guild.unbanMember(user.id, reason)
            .then(() => {
                message.delete();
                message.channel.createMessage('unbannedSuccessfully', {user: `${user.username}#${user.discriminator}`});

                const embed = new Embed();
                embed.setAuthor(`Caso #${guild.cases + 1} | Desbanido`, user.avatarURL);
                embed.addField('Usuário', `\`${user.username}\``, true);
                embed.addField('Desmartelado por', `\`${message.author.username}\``, true);
                embed.addField('Motivo', reason);
                embed.setFooter(`ID: ${user.id}`);
                this.client.getChannel(process.env.modlog).createMessage(embed.build());
                guild.cases += 1;
                guild.save();
            })
            .catch(() => {
                message.reply('Não foi possível desbanir este usuário. Veja se colocou o ID correto ou veja se o usuário está realmente banido.');
            });
    }
}