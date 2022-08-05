import dotenv from 'dotenv'
import canvas from 'canvas'
canvas.registerFont('assets/fonts/BebasNeue-Regular.ttf', {
    family: 'bebas'
});
dotenv.config();
import {Client} from './src/structures/index.js'
const client = new Client(process.env.token, {
    restMode: true,
    intents: ['all'],
    defaultImageSize: 4096,
    allowedMentions: {
        repliedUser: true,
        users: true
    }
});
client.login();