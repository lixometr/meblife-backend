const AppError = require("../helpers/error")
const config = require('../config')
class Controller {
  constructor(facade, modification) {
    this.facade = facade
    this.Modification = modification
  }

  async create(req, res, next) {
    try {
      const item = await this.facade.create(req.body)
      res.status(201).json(item)
    } catch (err) {
      next(err)
    }
  }
  async search(req, res, next) {
    try {
      const searchPhrase = req.params.text
      let items = []
      if (!searchPhrase) {
        await this.findAll(req,res, next)
        return
      } else {
        items = await this.facade.search(searchPhrase, req.request.language._id)
      }
      const resolvers = items.map(async item => {
        const instance = new this.Modification(item, {
          langId: req.request.language._id,
          defaultLangId: req.settings.language._id,
          currency: req.request.currency,
          defaultCurrency: req.settings.currency
        })
        await instance.init()
        if (req.adminUser) {
          return instance.toADMIN()
        } else {
          return instance.toINFO()
        }
      })
      const allItems = await Promise.all(resolvers)
      const toSend = await this.facade.paginate({ items: allItems, nowPage: req.query.page, perPage: req.query.per_page })
      res.json(toSend)
    } catch (err) {
      next(err)
    }
  }
  async findAll(req, res, next) {
    try {
      let page = parseInt(req.query.page)
      if (isNaN(page)) {
        page = 1
      }
      let perPage = parseInt(req.query.per_page)
      if (isNaN(perPage)) {
        perPage = config.perPage
      }
      let { items, total } = await this.facade.findWithPagination({ nowPage: page, perPage })
      const resolvers = items.map(async item => {
        const instance = new this.Modification(item, {
          langId: req.request.language._id,
          defaultLangId: req.settings.language._id,
          currency: req.request.currency,
          defaultCurrency: req.settings.currency
        })
        try {
          await instance.init()

        } catch (err) { }

        if (req.adminUser) {
          return instance.toADMIN()
        }

        return instance.toINFO()

      })
      items = await Promise.all(resolvers)

      let totalPages = total / perPage
      totalPages = Math.ceil(totalPages)
      const toSend = {
        items,
        info: {
          nowPage: page,
          totalPages
        }
      }
      res.json(toSend)
    } catch (err) {
      next(err)
    }
  }

  async findById(req, res, next) {
    try {
      const item = await this.facade.findById(req.params.id)
      if (!item) throw new AppError(404)
      const instance = new this.Modification(item, {
        langId: req.request.language._id,
        defaultLangId: req.settings.language._id,
        currency: req.request.currency,
        defaultCurrency: req.settings.currency
      })
      if (req.adminUser) {
        res.json(instance.toADMIN())
        return
      }

      await instance.init()
      res.json(instance.toFULL())
    } catch (err) {
      next(err)
    }
  }
  async findBySlug(req, res, next) {
    try {
      const item = await this.facade.findBySlug(req.params.slug, req.request.language._id)
      if (!item) throw new AppError(404)
      req.params.id = item._id.toString()
      await this.findById(req, res, next)
    } catch (err) {
      next(err)
    }
  }
  async updateById(req, res, next) {
    try {
      const result = await this.facade.updateById(req.params.id, req.body)
      if (result.n < 1) { return res.sendStatus(404) }
      if (result.nModified < 1) { return res.sendStatus(304) }
      res.status(204).json({ ok: true })
    } catch (err) {
      next(err)
    }
  }
  async removeById(req, res, next) {
    try {
      const result = await this.facade.deleteById(req.params.id)
      res.json(result)
    } catch (err) {
      next(err)
    }
  }

}

module.exports = Controller
