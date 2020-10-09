const WidgetModification = require("../modification");

module.exports = class HeaderMenu extends WidgetModification {
    constructor(...args) {
        super(...args)
        this.schema = {
            values: {
                items: [
                    ''
                ]
            }
        }
    }
    async init() {
    }


}