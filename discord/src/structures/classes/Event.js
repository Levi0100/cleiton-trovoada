export default class Event {
    constructor(options) {
        this.name = options.name
        this.client = options.client
    }
    async run() {}
}