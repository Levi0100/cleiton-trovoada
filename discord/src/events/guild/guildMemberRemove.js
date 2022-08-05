import {Event} from '../../structures/index.js'
import {User} from '../../../../database/index.js'

export default class GuildMemberRemoveEvent extends Event {
    constructor(client) {
        super({
            name: 'guildMemberRemove',
            client
        });
    }
    async run(guild, member) {
        const user = await User.findById(member.id);
        var memberCount = guild.members.size;
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
    }
}