import {Command, Embed} from '../../structures/index.js'
import {Guild} from '../../../../database/index.js'
import ms from 'enhanced-ms'

export default class BanCommand extends Command {
    constructor(client) {
        super({
            name: 'mute',
            aliases: ['m', 'mutar', 'silenciar'],
            category: 'mod',
            client
        });
    }
    async run(message) {
        const member = this.getMember(message.args[0]);
        if(!member) return message.reply('Membro inválido!');
        const guild = await Guild.findById('721384921679265833');
        var reason = message.args.slice(2).join(' ');
        var time = message.args[1];
        if(!time) return message.reply('Informe o tempo que durará o mute.');
        if(!reason) return message.reply('Informe o motivo da punição.');
        switch(reason) {
            case 'divdm': reason = 'Divulgar um conteúdo, não solicitado via DM (mensagem direta). Fique sabendo que, caso continue a sua conta poderá ser suspensa do Discord, ficando inutilizável.'
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
        const t = ms(time);
        const embed = new Embed()
        embed.setAuthor(`Caso #${guild.cases + 1} | Mutado`, member.avatarURL);
        embed.addField('Usuário', member.mention, true);
        embed.addField('Martelado por', message.author.mention, true);
        embed.addField('Acaba em', `<t:${parseInt((Date.now() + Number(t)) / 1000)}:f>`, true);
        embed.addField('Motivo', reason);
        embed.setFooter(`ID: ${member.id}`);
        this.client.getChannel(process.env.modlog).createMessage(embed.build(member.mention));
        guild.cases += 1;
        guild.save();
        member.edit({communicationDisabledUntil: new Date(new Date().getTime() + t)});
        message.delete();
        message.channel.createMessage('mutedSuccesfully', {user: `${member.username}#${member.discriminator}`});
    }
}