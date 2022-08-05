import {Command, Embed} from '../../structures/index.js'

export default class HelpCommand extends Command {
    constructor(client) {
        super({
            name: 'help',
            aliases: ['ajuda', 'commands', 'comandos'],
            client: client
        });
    }
    async run(message) {
        const embed = new Embed();
        embed.setTitle('Meus Comandos');
        embed.setThumbnail(this.client.user.avatarURL);
        const categories = this.client.commands.map(cmd => cmd.category).filter((a, b, c) => c.indexOf(a) === b);
        categories.forEach(category => {
            const cmds = this.client.commands.filter(cmd => cmd.category === category)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(cmd => `\`${process.env.prefix}${cmd.name}\``)
            .join(', ');
            if(!category) category = 'Miscelânea'
            embed.addField(category, cmds);
        });
        message.reply(embed.build());
    }
}