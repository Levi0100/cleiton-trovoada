import {Client, Collection} from 'eris'
import mongoose from 'mongoose'
import fs from 'fs'

export default class App extends Client {
    /**
     * 
     * @param {string} token Bot token
     * @param {object} options Client options
     */
    constructor(token, options) {
        super(token, options);
        this.slash = new Collection();
        this.commands = new Collection();
        this.aliases = new Collection();
    }
    async login() {
        var modulesC = fs.readdirSync('discord/src/commands');
        for (var module of modulesC) {
            var commands = fs.readdirSync(`discord/src/commands/${module}`);
            for (var command of commands) {
                const Command = await import(`../../commands/${module}/${command}`);
                const cmd = new Command.default(this);
                this.commands.set(cmd.name, cmd);
                if(cmd.aliases != Array) {
                    cmd.aliases.forEach(alias => {
                        this.aliases.set(alias, cmd.name);
                    });
                }
            }
        }
        var modulesE = fs.readdirSync('discord/src/events');
        for (var module of modulesE) {
            var events = fs.readdirSync(`discord/src/events/${module}`);
            for (var event of events) {
                const Event = await import(`../../events/${module}/${event}`);
                const evt = new Event.default(this);
                this.on(evt.name, (...args) => evt.run(...args).catch(err => console.log(err)));
            }
        }
        await mongoose.connect(process.env.database_url);
        console.log('Conectado ao banco de dados com Successo!');
        this.connect();
    }
}