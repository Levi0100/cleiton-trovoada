import {Command} from '../../structures/index.js'

export default class PingCommand extends Command {
    constructor() {
        super({name: 'ping'});
    }
    async run(message) {
        message.reply(`Pong! \`${message.guild.shard.latency }ms\``);
    }
}