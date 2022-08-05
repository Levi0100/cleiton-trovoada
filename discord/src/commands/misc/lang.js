import {Command} from '../../structures/index.js'
import {User} from '../../../../database/index.js'

export default class LanguageCommand extends Command {
    constructor() {
        super({
            name: 'language',
            aliases: ['lang', 'idioma']
        });
    }
    async run(message) {
        const user = await User.findById(message.author.id) || new User({_id: message.author.id});
        switch(message.args[0]) {
            case 'pt':
                user.lang = 'pt';
                await user.save();
                message.reply('Agora eu falarei em português contigo!');
            break;
            case 'en':
                user.lang = 'en';
                await user.save();
                message.reply('Now I will speak in English with you!');
        }
    }
}