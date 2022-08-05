import {Event} from '../../structures/index.js'
import {User} from '../../../../database/index.js'
import moment from 'moment'
moment.locale('pt-BR');

export default class ReadyEvent extends Event {
    constructor(client) {
        super({
            name: 'ready',
            client
        });
    }
    async run() {
        console.log(`Logged as ${this.client.user.username}#${this.client.user.discriminator}`);
        await this.client.editStatus('online', {
            type: 0,
            name: 'Supervisionando a Comunidade'
        });
        const deleteData = async() => {
            const users = await User.find({_id: {$exists: true}});
            for(const user of users) {
                const member = await this.client.getRESTGuildMember('721384921679265833', user.id);
                if(!member) user.delete();
            }
        }
        setInterval(() => {
            //deleteData();
        }, 1000 * 10);
    }
}