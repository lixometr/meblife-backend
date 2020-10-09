const { spread } = require("lodash");
const WidgetModification = require("../modification");

module.exports = class MainPage extends WidgetModification {
    constructor(...args) {
        super(...args)
        this.schema = {
            texts: {
                title: [],
                sub_title: [],
                more_btn: [],
                more_btn_url: [],
            },
            values: {
                bg_image: {
                    url: "",
                },
                slider: [
                    {
                        title: [],
                        sub_title: [],
                        more_btn: [],
                        more_btn_url: [],
                        image: {}
                    }
                ],
                tabs: [
                    {
                        tab_name: [],
                        module_groups: [],
                    },
                    {
                        tab_name: [],
                        module_groups: [],
                    },
                    {
                        tab_name: [],
                        module_groups: [],
                    },
                ],
            },
        }
    }
    translate() {
        super.translate()
        this.item.values.tabs = this.item.values.tabs.map(tab => ({
            module_groups: tab.module_groups,
            tab_name: this.translateField(tab.tab_name)
        }))
        this.item.values.slider = this.item.values.slider.map(slide => ({
            title: this.translateField(slide.title),
            sub_title: this.translateField(slide.sub_title),
            more_btn: this.translateField(slide.more_btn),
            more_btn_url: this.translateField(slide.more_btn_url),
            image: slide.image
        }))
    }


}