const mongoose = require('mongoose')
const Schema = mongoose.Schema

const widgetSchema = new Schema({
  name: {
    type: String,
    index: true
  },
  // Тут значения которые будут переводится
  texts: {
    type: {},
    default: () => ({})
  },

  // Разные значения
  values: {
    type: {},
    default: () => ({})
  },
  items: {
    type: [{}],
    default: () => []
  }
}, { minimize: false })

module.exports = widgetSchema