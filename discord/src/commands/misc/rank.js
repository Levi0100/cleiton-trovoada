import Canvacord from 'canvacord'
import {Command, Embed} from '../../structures/index.js'
import {User} from '../../../../database/index.js'
import mongoose from 'mongoose'

export default class RankCommand extends Command {
    constructor() {
        super({
            name: 'rank',
            aliases: ['level', 'ranking', 'xp']
        });
    }
    async run(message) {
        switch (message.args[0]) {
            case 'top': 
                mongoose.connection.collection('users').find({'exp.xp': {$gt: -1}})
                    .toArray((err, response) => {
                        if(err) throw err
                        var exp = response.map(x => x.exp).sort((a, b) => {
                            if(b.level === a.level) {
                                return b.xp - a.xp
                            }
                            else return b.level - a.level
                        });
                        if(message.args[1] && message.args[1] == 1 || !message.args[1]) exp = [
                            ...exp.values()
                        ]
                        .map(x => {
                            return {
                                id: x.id,
                                level: x.level,
                                xp: x.xp
                            }
                        }).slice(0, 10)
                        else exp = [
                            ...exp.values()
                        ]
                        .map(x => {
                            return {
                                id: x.id,
                                level: x.level,
                                xp: x.xp
                            }
                        }).slice(message.args[1]*10-10, message.args[1]*10);
                        const embed = new Embed();
                        embed.setTitle(`Top ${message.args[1] ? message.args[1]*10 : 10} membros que mais conversam`);

                        let a;
                        if(message.args[1]) {
                            switch(message.args[1]) {
                                case '1': a = 1
                                    break
                                default: a = message.args[1]*10-9
                            }
                        }
                        else a = 1
                        exp.forEach(x => {
                            const member = message.guild.members.get(x.id);
                            if(member) embed.addField(`${a++}° ${member.username}`, `Nível ${x.level}\n${x.xp} XP`);
                        });
                        message.reply(embed.build());
                    })
            
                break;
            default:
                var member = this.getMember(message.args[0] ?? message.member.mention);
                const user = await User.findById(member.id);
                if(!user) return message.reply('noRank');
                mongoose.connection.collection('users').find({'exp.xp':{$gt: -1}})
                    .toArray((err, response) => {
                        if(err) throw err
                        var exp = response.map(x => x.exp).sort((a, b) => {
                            if(b.level === a.level) {
                                return b.xp - a.xp
                            }
                            else return b.level - a.level
                        });
                        let ranking = [...exp.values()].findIndex(x => x.id === member.id) + 1

                        const rank = new Canvacord.Rank();
                        rank.setBackground('COLOR', '#ffffff');
                        rank.setAvatar(member.avatarURL);
                        rank.setCurrentXP(user.exp.xp);
                        rank.setRequiredXP(user.exp.xpRequiredToUp);
                        rank.setStatus(member.status === undefined ? 'offline' : member.status);
                        rank.setProgressBar('#23272A');
                        rank.setUsername(member.username);
                        rank.setDiscriminator(member.discriminator);
                        rank.setLevel(user.exp.level, 'Level');
                        rank.setRank(ranking, 'Rank');
                        rank.build()
                            .then(data => {
                                message.reply('', {
                                    file: data,
                                    name: 'rank.png'
                                });
                            });
                    });
        }
    }
}