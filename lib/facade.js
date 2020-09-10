const mongoose = require('mongoose')
const { translateFields } = require('../helpers/functions')

class Facade {
  constructor(name, schema) {
    this.Model = mongoose.model(name, schema)
  }

  create(body) {
    const model = new this.Model(body)
    return model.save()
  }

  find(...args) {
    return this.Model
      .find(...args)

  }
  async findAll(...args) {
    const result = await this.Model.find()
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
    const result = await this.Model.findOneAndUpdate({_id: id}, data)
    return result
  }
  deleteById(id) {
    return this.Model.findOneAndDelete({_id: id})
  }
  translate(obj, languageId, defaultLanguageId) {
    return translateFields(obj, this.fieldsToTranslate, languageId, defaultLanguageId)
  }
}

module.exports = Facade
