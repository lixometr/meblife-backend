const mongoose = require('mongoose')
const { translateFields } = require('../helpers/functions')
const _ = require('lodash')
class Facade {
  constructor(name, schema) {
    this.Model = mongoose.model(name, schema)
  }

  create(body) {
    const model = new this.Model(body)
    return model.save()
  }
  async search(text, langId) {
    return this.Model.find({
      name: { $elemMatch: { value: new RegExp(text, 'ig'), langId } }
    })
  }
  find(...args) {
    return this.Model
      .find(...args)

  }
  async findAll(options = {}) {
    const result = await this.Model.find({}, null, options)
    return result
  }

  findOne(...args) {
    return this.Model
      .findOne(...args)

  }

  findById(id) {
    return this.Model
      .findById(id)

  }

  async findBySlug(slug, langId) {
    const item = await this.Model.findOne({ slug: { $elemMatch: { value: slug, langId } } })
    return item
  }
  update(...args) {
    return this.Model
      .updateOne(...args)

  }
  async updateById(id, data) {
    const result = await this.Model.findOneAndUpdate({ _id: id }, data)
    return result
  }
  async beforeRemove(id) {
    if(!this.relations) return
    const resolvers = this.relations.map(async rel => {
      const model = this.Model.model(rel.model)
      let result;
      if (rel.resolver) {
        result = await rel.resolver({ model, id })
      } else {
        result = await model.updateMany({}, { $pull: { [rel.field]: id } }, { multi: true })

      }

    })
    await Promise.all(resolvers)
  }
  async deleteById(id) {
    await this.beforeRemove(id)
    return this.Model.findOneAndDelete({ _id: id })
  }
  translate(obj, languageId, defaultLanguageId) {
    return translateFields(obj, this.fieldsToTranslate, languageId, defaultLanguageId)
  }
}

module.exports = Facade
