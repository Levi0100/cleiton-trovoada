export default class Embed {
    constructor() {
        this.author = null;
        this.title = null;
        this.url = null;
        this.description = null;
        this.fields = [];
        this.image = null;
        this.thumbnail = null;
        this.timestamp = new Date();
        this.footer = null;
        this.color = 0x7289DA;
    }

    /**
     * 
     * @param {string} name 
     * @param {string} icon_url 
     * @param {string} url 
     * @returns {Embed}
     */
    setAuthor(name, icon_url, url) {
        return this.author = {name, icon_url, url}
    }

    /**
     * 
     * @param {string} title 
     * @returns {Embed}
     */
    setTitle(title) {
        return this.title = title
    }

    /**
     * 
     * @param {string} description 
     * @returns {Embed}
     */
    setDescription(description) {
        return this.description = description.toString().substring(0, 2048);
    }

    /**
     * 
     * @param {string} color 
     */
    setColor(color) {
        if(typeof color != 'string') throw new Error('The color type must be a string');
        return this.color = parseInt(color.toUpperCase().replace('#', ''), 16);
    }
    /**
     * 
     * @param {string} name 
     * @param {string} value 
     * @param {boolean} inline 
     * @returns {Embed}
     */
    addField(name, value, inline = false) {
        if(!name) throw new Error('Informe o nome da field!');
        if(!value) throw new Error('Informe o valor da field');

        return this.fields.push({
            name: name.toString().substring(0, 256),
            value: value.toString().substring(0, 1024),
            inline: inline
        });
    }

    setImage(url) {
        return this.image = {url};
    }

    /**
     * 
     * @param {string} url 
     * @returns {Embed}
     */
    setThumbnail(url) {
        return this.thumbnail = {url}
    }

    /**
     * 
     * @param {string} url 
     * @returns {Embed}
     */
    setURL(url) {
        return this.url = url
    }

    /**
     * 
     * @param {number} timestamp 
     * @returns {Embed}
     */
    setTimestamp(timestamp = new Date()) {
        return this.timestamp = timestamp
    }

    /**
     * 
     * @param {string} text 
     * @param {string} iconURL 
     * @returns {Embed}
     */
    setFooter(text, iconURL) {
        return this.footer = {
            text: text.toString().substring(0, 2048),
            icon_url: iconURL
        }
    }
    build(content = '') {
        return {content, embeds: [this]}
    }
}