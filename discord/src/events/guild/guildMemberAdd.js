import {Event} from '../../structures/index.js'
import Canvas from 'canvas'

export default class GuildMemberAddEvent extends Event {
    constructor(client) {
        super({
            name: 'guildMemberAdd',
            client
        });
    }
    async run(guild, member) {
        if(member.bot) return;
        var memberCount = guild.members.size
        var count = memberCount.toString();
        var array = [];
        for (var i = 0; i<count.length; i++) {
            var num = count.charAt(i);
            switch(num) {
                case '0': num = '<:number_zero:933453410286583848>'
                    break
                case '1': num = '<:number_one:933453490620104715>'
                    break
                case '2': num = '<:number_two:933453529912332318>'
                    break
                case '3': num = '<:number_three:933453678369706055>'
                    break
                case '4': num = '<:number_four:933453718119149599>'
                    break
                case '5': num = '<:number_five:933453746770419742>'
                    break
                case '6': num = '<:number_six:933453858515091607>'
                    break
                case '7': num = '<:number_seven:933453905470296114>'
                    break
                case '8': num = '<:number_eight:933453968837857360>'
                    break
                case '9': num = '<:number_nine:933454039176347718>'
            }
            array.push(num);
        }
        var counter = array.join('');
        this.client.getChannel('813485302039314504')
        .edit({
            topic: `Estamos com ${counter} nerds!`
        });
        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext('2d');
        const background = await Canvas.loadImage('https://imgur.com/L8BpDW5.png');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        ctx.font = '70px bebas';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Boas Vindas', canvas.width / 2.5, canvas.height / 3.5);

        ctx.font = '42px bebas';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${member.username}#${member.discriminator}`, canvas.width / 2.4, canvas.height / 1.8);

        const avatar = await Canvas.loadImage(member.avatarURL);
        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(avatar, 25, 25, 200, 200);

        this.client.getChannel('850983705739919360')
        .createMessage(`${member.mention} Passando aqui para te desejar boas vindas ao ${guild.name}! Sinta-se à vontade para conversar com a galera daqui.\n\n• Fique de olho nas novidades da Maneki no canal <#988475540392525844>\n• Converse no <#813485302039314504> para fazer novos amigos e ganhar XP\n• Dê sugestões para o servidor em <#938799049740525648>\n\nAh, vê se não esquece de ler as <#740736819494256741> do servidor para evitar punições futuras!`, {
            file: canvas.toBuffer(),
            name: 'welcome.png'
        });
    }
}