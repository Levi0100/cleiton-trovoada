import {Command} from '../../structures/index.js'
import {User} from '../../../../database/index.js'

export default class ResetXPCommand extends Command {
    constructor() {
        super({
            name: 'resetxp',
            onlyOwner: true
        });
    }
    async run(message) {
        const member = message.guild.members.get(message.args[0]);
        if(!member) return message.reply('Use o ID de alguém.');
        const user = await User.findById(member.id);
        if(!user) return message.reply('Este usuário não está salvo no banco de dados.');
        user.exp.level = null
        user.exp.xp = null
        user.exp.xpRequiredToUp = null
        user.exp.id = null
        await user.save();
        message.reply(`O XP de \`${member.username}\` foi resetado com Successo!`);
    }
}