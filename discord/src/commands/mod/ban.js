import {Command, Embed} from '../../structures/index.js'
import {Guild} from '../../../../database/index.js'

export default class BanCommand extends Command {
    constructor(client) {
        super({
            name: 'ban',
            aliases: ['b', 'banir'],
            category: 'mod',
            client
        });
    }
    async run(message) {
        const user = await this.getUser(message.args[0]);
        const guild = await Guild.findById('721384921679265833');
        var reason = message.args.slice(1).join(' ');
        if(!reason) return message.reply('noReason');
        switch(reason) {
            case 'divdm': reason = 'Divulgar um conteúdo não solicitado via DM (mensagem direta). Fique sabendo que, caso continue a sua conta poderá ser suspensa do Discord, ficando inutilizável.'
            break
            case 'toxic': reason = 'Ficar sendo tóxico com outros usuários, desrespeitando-os e xingando-os. Aprenda a ser mais respeitável com as pessoas se quiser fazer parte dessa comunidade.'
            break
            case 'selfbot': reason = 'Não é permitido o uso de selfbot no nosso servidor! Caso continue, a conta poderá ser suspensa da plataforma, ficando inutilizável.'
            break
            case 'owo': reason = 'Apenas um teste. Desculpe a incoveniência... <:sad_cat_thumbs_up:902309767073116211>'
            break
            case 'div': reason = 'Divulgação dentro do servidor sem que a equipe permita é proibida.'
            break
            case 'under13': reason = 'Ter menos de 13 anos. Saiba que isso é contra os ToS do Discord e sua conta pode ser suspensa, ficando inutilizável.'
            break
            case 'nsfw': reason = 'Postar conteúdo NSFW (coisas obscenas como pornografia explícita, gore e coisas relacionadas), com conteúdo sugestivo, assédio e com links ilegais.'
        }
        const embed = new Embed();
        embed.setAuthor(`Casos #${guild.cases + 1} | Banido`, user.avatarURL);
        embed.addField('Usuário', user.mention, true);
        embed.addField(`Martelado por`, message.author.mention, true);
        embed.addField('Motivo', reason);
        embed.setFooter(`ID: ${user.id}`);
        this.client.getChannel(process.env.modlog).createMessage(embed.build());
        await message.guild.banMember(user.id, 0, reason);
        guild.cases += 1
        guild.save();
        message.delete();
        message.channel.createMessage('bannedSuccessfully', {user: `${user.username}#${user.discriminator}`});
    }
}