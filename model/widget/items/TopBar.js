const WidgetModification = require("../modification");

module.exports = class TopBar extends WidgetModification {
    constructor(...args) {
        super(...args)
        this.schema = {
            values: {
                items: [
                    {
                        title: [],
                        url: [],
                        icon: {}
                    },
                    {
                        title: [],
                        url: [],
                        icon: {}
                    },
                    {
                        title: [],
                        url: [],
                        icon: {}
                    },
                    {
                        title: [],
                        url: [],
                        icon: {}
                    },
                ]
            }
        }
    }
    translate() {
        super.translate()
        const items = this.item.values.items
        this.item.values.items = items.map(item => ({
            title: this.translateField(item.title),
            url: this.translateField(item.url),
            icon: item.icon
        }))
    }

}