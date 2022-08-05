import {Command, Embed} from '../../structures/index.js'
export default class ReasonCommand extends Command {
    constructor(client) {
        super({
            name: 'reason',
            aliases: ['r', 'motivo'],
            category: 'mod',
            client
        });
    }
    async run(message) {
        const message_id = message.args[0];
        if(!message_id) return message.reply('noMessageId');
        const reason = message.args.slice(1).join(' ');
        if(!reason) return message.reply('noReason');

        this.client.getChannel(process.env.modlog).getMessage(message_id)
            .then(msg => {
                msg.embeds.forEach(x => {
                    const embed = new Embed();
                    embed.setAuthor(x.author.name, x.author.icon_url);
                    embed.addField('Usuário', x.fields[0].value, true);
                    embed.addField('Martelado por', x.fields[1].value, true);
                    embed.setFooter(x.footer.text);
                    embed.setTimestamp(x.timestamp);

                    if(x.fields[3]) {
                        switch (x.fields[2].name) {
                            case 'Motivo': embed.addField('Motivo', reason, true);
                                break
                            default: 
                                embed.addField(x.fields[2].name, x.fields[2].value, true);
                                embed.addField(x.fields[3].name, reason, true);
                        }
                    }
                    else embed.addField('Motivo', reason, true);

                    try {
                        if(msg.content) msg.edit(embed.build());
                        else msg.edit(embed.build(msg.content));
                        message.reply(`Motivo atualiado com Successo!\n${msg.jumpLink}`);
                    } catch (e) {
                        message.reply(`Não foi possível alterar o motivo...\n\`${e}\``);
                    }
                });
            });
    }
}