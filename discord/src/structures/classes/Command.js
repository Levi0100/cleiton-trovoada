export default class Command {
    constructor(options) {
        this.name = options.name;
        this.description = options.description || null;
        this.aliases = options.aliases || [];
        this.category = options.category || null;
        this.onlyOwner = options.onlyOwner || false;
        this.client = options.client;
        this.options = options.options;
    }
    async run() {}
}