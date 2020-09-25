const Facade = require('../../lib/facade')
const languageSchema = require('./schema')
const config = require('../../config')
const path = require('path')
const fs = require('fs')
class LanguageFacade extends Facade {
    constructor(...args) {
        super(...args)
    }
    async create(body) {
        const model = new this.Model(body)
        const result = await model.save()
        await this.createTranslation(body.slug)
        return result
    }
    async deleteById(id) {
        await this.beforeRemove(id)
        const item = await this.findById(id)
        if (!item) return
        const result = await this.Model.findOneAndDelete({ _id: id })
        await new Promise((resolve) => {
            fs.unlink(this.translationPathBySlug(item.slug), err => {
                if (err) resolve(false)
                resolve(true)
            })
        })
        return result
    }
    async updateById(id, data) {
        const oldItem = await this.findById(id)
        const result = await this.Model.findOneAndUpdate({ _id: id }, data)
        await this.renameTranslation(oldItem.slug, data.slug)
        return result
    }
    async findBySlug(slug) {
        return this.Model.findOne({ slug });
    }
    async createTranslation(slug) {
        const filePath = this.translationPathBySlug(slug)
        const result = await new Promise((resolve, reject) => {
            fs.writeFile(filePath, '{}', (err, data) => {
                if (err) return resolve(false)
                resolve(true)
            })
        })
        return result
    }
    async renameTranslation(slug, newSlug) {
        const oldPath = this.translationPathBySlug(slug)
        const newPath = this.translationPathBySlug(newSlug)
        const result = await new Promise((resolve, reject) => {
            fs.rename(oldPath, newPath, (err, data) => {
                if (err) return resolve(false)
                resolve(true)

            })
        })
        return result
    }
    translationPathBySlug(slug) {
        const filePath = path.join(config.langDir, slug + '.json')
        return filePath
    }
    async existTranslation(slug) {
        const filePath = this.translationPathBySlug(slug)

        const isExist = await new Promise((resolve, reject) => {
            fs.access(filePath, fs.F_OK, (err) => {
                if (err) {
                    console.error(err)
                    resolve(false)
                }
                resolve(true)
            })
        })

        return isExist
    }
    /**
     * 
     * @param {String} slug 
     * @returns Object if exist OR false if not exist
     */
    async getTranslation(slug) {
        const filePath = this.translationPathBySlug(slug)

        const result = await new Promise((resolve, reject) => {
            fs.readFile(filePath, (err, data) => {
                if (err) return resolve(false)
                const json = Buffer.from(data).toString()
                try {
                    const obj = JSON.parse(json)
                    resolve(obj)
                } catch (err) {
                    resolve(false)
                }
            })
        })

        return result
    }
    async updateTranslation(slug, data) {
        const filePath = this.translationPathBySlug(slug)
        const strData = JSON.stringify(data)
        const result = await new Promise((resolve, reject) => {
            fs.writeFile(filePath, strData, (err, data) => {
                if (err) return resolve(false)
                resolve(true)
            })
        })

        return result
    }
}

module.exports = new LanguageFacade('Language', languageSchema)
