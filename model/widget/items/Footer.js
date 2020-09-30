const { times } = require("lodash");
const WidgetModification = require("../modification");

module.exports = class Footer extends WidgetModification {
    constructor(...args) {
        super(...args)
        this.schema = {
            values: {
                block1: {
                    title: '',
                    items: [
                        {
                            title: '',
                            sub_title: ''
                        }
                    ]
                }
            }
        }
    }
    translate() {
        super.translate()
        const values = this.item.values
        this.item.values.block1.title = this.translateField(values.block1.title)
        this.item.values.block1.items = this.item.values.block1.items.map(item => ({
            title: this.translateField(item.title),
            sub_title: this.translateField(item.sub_title),
            url: this.translateField(item.url),
            image: item.image
        }))
        this.item.values.block2.title = this.translateField(values.block2.title)
        this.item.values.block2.items = this.item.values.block2.items.map(item => ({
            title: this.translateField(item.title),
            url: this.translateField(item.url),
            image: item.image
        }))
        this.item.values.block3.title = this.translateField(values.block3.title)
        this.item.values.block3.items = this.item.values.block3.items.map(item => ({
            title: this.translateField(item.title),
            url: this.translateField(item.url),
            image: item.image
        }))
        this.item.values.block4.title = this.translateField(values.block4.title)
        this.item.values.block4.sub_title = this.translateField(values.block4.sub_title)
        this.item.values.block4.items = this.item.values.block4.items.map(item => ({
            title: this.translateField(item.title),
            sub_title: this.translateField(item.sub_title),
            url: this.translateField(item.url),
            image: item.image
        }))
        this.item.values.block5.title = this.translateField(values.block5.title)
        this.item.values.block5.sub_title = this.translateField(values.block5.sub_title)
        this.item.values.block5.description = this.translateField(values.block5.description)
        this.item.values.block5.images = this.item.values.block5.images

        this.item.values.block6.title = this.translateField(values.block6.title)
        this.item.values.block6.sub_title = this.translateField(values.block6.sub_title)
        this.item.values.block6.description = this.translateField(values.block6.description)
        this.item.values.block6.images = this.item.values.block6.images

        this.item.values.block6.title = this.translateField(values.block6.title)

        this.item.values.block7.items = this.item.values.block7.items.map(item => ({
            title: this.translateField(item.title),
            sub_title: this.translateField(item.sub_title),
            image: item.image
        }))
        this.item.values.block8.items = this.item.values.block8.items.map(item => ({
            title: this.translateField(item.title),
            image: item.image
        }))
        this.item.values.block9.title = this.translateField(values.block9.title)
        this.item.values.block9.email = this.translateField(values.block9.email)
        this.item.values.block9.phone = this.translateField(values.block9.phone)
        this.item.values.block9.chat = this.translateField(values.block9.chat)

        this.item.values.block10.title = this.translateField(values.block10.title)
        this.item.values.block10.sub_title = this.translateField(values.block10.sub_title)
        this.item.values.block10.categories = this.item.values.block10.categories

        this.item.values.block11.title = this.translateField(values.block11.title)

        this.item.values.block11.items = this.item.values.block11.items.map(item => ({
            title: this.translateField(item.title),
            url: this.translateField(item.url)
        }))
        this.item.values.block12.title = this.translateField(values.block12.title)
        this.item.values.block12.description = this.translateField(values.block12.description)
        this.item.values.block12.links = this.item.values.block12.links
    }
    // toINFO() {
    //     return {
    //         values: this.item.val
    //     }
    // }

}