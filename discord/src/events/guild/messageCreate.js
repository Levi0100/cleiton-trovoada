import {User} from '../../../../database/index.js'
import {Event} from '../../structures/index.js'
import LanguageDetect from 'languagedetect'
const LanguageDetector = new LanguageDetect();

export default class MessageCreateEvent extends Event {
    constructor(client) {
        super({
            name: 'messageCreate',
            client
        });
    }
    async run(message) {
        if(message.author.bot) return;
        const language = message.content ? LanguageDetector.detect(message.content) : undefined;
        switch(message.channel.id) {
            case '988468245537378304': {
                if(!language) return;
                if(language[0] && language[0][0] === 'portuguese') {
                    var msg = await message.channel.createMessage(`${message.author.mention} Parece que você está falando em português num canal que só é permitido inglês. Vá para a <#813485302039314504> se quiser conversar em português.`);
                    setTimeout(() => msg.delete(), 1000 * 10);
                }
            }
                break;
            case '813485302039314504': {
                if(!language) return;
                if(language[0] && language[0][0] === 'english') {
                    var msg = await message.channel.createMessage(`${message.author.mention} Looks like that you are speaking in English on a channel that only Portuguese is allowed. Go to <#988468245537378304> if you want to talk in English.`);
                    setTimeout(() => msg.delete(), 1000 * 10);
                }
            }
        }
        message.reply = async function(content, options) {
            const user = await User.findById(message.author.id) || new User({_id: message.author.id});
            const locale = await import(`../../../../locales/${user.lang || 'pt'}.js`);
            switch(typeof content) {
                case 'string': {
                    if(options && options.file && options.name) {
                        return message.channel.createMessage({
                            content: locale.default.get(content),
                            messageReferenceID: message.id
                        }, {
                            file: options.file,
                            name: options.name
                        });
                    }
                    else return message.channel.createMessage({
                        content: locale.default.get(content),
                        messageReferenceID: message.id
                    });
                }
                case 'object': {
                    return message.channel.createMessage(Object.assign(content, {
                        messageReferenceID: message.id
                    }));
                }
            }
        }
        if(message.channel.id === '813485302039314504' || message.channel.id === '988468245537378304') {
            const user = await User.findById(message.author.id) || new User({_id: message.author.id});
            if(message.content.length >= 5) {
                var xp = message.content.length * 1.2;
                user.exp.xp += parseInt(xp);
                user.exp.id = message.author.id;
                user.save();
                if(user.exp.xp > user.exp.xpRequiredToUp) {
                    const member = await User.findById(message.author.id);
                    member.exp.level += 1;
                    member.exp.xpRequiredToUp += 136;
                    member.exp.xp = 0;
                    member.save();
                    message.channel.createMessage(`${message.author.mention} Parabéns! Você upou para o nível **${member.exp.level}**!`);
                    switch(member.exp.level) {
                        case 1: message.member.addRole('863155348478230528');
                            break
                        case 5: message.member.addRole('863158721214152714');
                            break
                        case 10: message.member.addRole('832705112229019659');
                            break
                        case 20: message.member.addRole('863156747912740904');
                            break
                        case 30: message.member.addRole('832340281260507187');
                            break
                        case 40: message.member.addRole('832704927582650390');
                            break
                        case 50: message.member.addRole('863159458896412722');
                            break
                        case 75: message.member.addRole('863160445149249586');
                            break
                        case 90: message.member.addRole('863161805018890260');
                            break
                        case 100: message.member.addRole('863161750051487755');
                            break
                        case 150: message.member.addRole('873868456683003934');
                    }
                }
            }
        }
        if(message.channel.type !== 1) {
            if(message.content.toLowerCase().startsWith(process.env.prefix.toLowerCase())) {
                const messageArray = message.content.split(' ');
                const command = messageArray.shift().toLowerCase();
                const args = messageArray.slice(0);
                const cmd = this.client.commands.get(command.slice(process.env.prefix.length)) || this.client.commands.get(this.client.aliases.get(command.slice(process.env.prefix.length)));
                message.args = args;
                message.guild = this.client.guilds.get(message.guildID);
                if(!cmd) return;
                if(cmd.onlyOwner && message.author.id !== '441932495693414410') return;
                if(cmd.category == 'mod' && !message.member.roles.includes('797289732513857556') && message.author.id !== '441932495693414410') return;
                if(cmd.category === String && message.channel.id !== '813488433967792158' && !message.member.roles.includes('797289732513857556')) return;
                await message.channel.sendTyping();
                cmd.getUser = async(args) => {
                    try {
                        if(isNaN(args)) {
                            return await this.client.getRESTUser(args.replace(/[<@!>]/g, ''));
                        }
                        else return await this.client.getRESTUser(args);
                    }
                    catch(err) {
                        console.log(err);
                    }
                }
                cmd.getMember = (args) => {
                    try {
                        if(isNaN(args)) {
                            return message.guild.members.get(args.replace(/[<@!>]/g, ''));
                        }
                        else return message.guild.members.get(args);
                    }
                    catch(err) {
                        console.log(err);
                    }
                }
                cmd.run(message)
                .catch(err => {
                    console.error(err)
                    message.reply(`Ocorreu um erro inesperado ao executar este comando...\n\`${err}\``);
                });
                if(cmd.category == 'mod') {
                    this.client.getChannel('922540990668103831')
                    .createMessage(`${message.author.mention} (${message.author.id}) executou o comando \`${message.content}\`.`);
                }
            }
        }
    }
}