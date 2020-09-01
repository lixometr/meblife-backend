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

  findOne(...args) {
    return this.Model
      .findOne(...args)

  }

  findById(...args) {
    return this.Model
      .findById(...args)

  }

  async findBySlug(slug, langId) {
    const item = await this.Model.findOne({ slug: { $elemMatch: { value: slug, langId } } })
    return item
  }
  update(...args) {
    return this.Model
      .updateOne(...args)

  }

  remove(...args) {
    return this.Model
      .remove(...args)

  }
  translate(obj, languageId, defaultLanguageId) {
    return translateFields(obj, this.fieldsToTranslate, languageId, defaultLanguageId)
  }
}

module.exports = Facade
