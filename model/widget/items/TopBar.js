const WidgetModification = require("../modification");

module.exports = class TopBar extends WidgetModification {
    constructor(...args) {
        super(...args)
        this.schema = {
            items: [
                {
                    title: '',
                    url: '',
                    image: ''
                }
            ]
        }
    }
    translate() {
        super.translate()
        const items = this.item.items
        this.item.items = items.map(item => ({
            title: this.translateField(item.title),
            url: this.translateField(item.url),
            image: item.image
        }))
    }

}