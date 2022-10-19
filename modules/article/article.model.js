const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ArticleSchema = new mongoose.Schema({
  _id: Number,
  title: {
    type: String,
    unique: true,
    required: [true, 'can\'t be blank'],
    index: true,
    alias: 'article',
  },
  description: {
    type: String,
  },
  articleImage: {
    type: String,
  },
  viewedBy: [ Number ],
  remarks: {
    type: String,
  },
  reason: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'User'
  },
  updatedBy: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'User'
  }
}, {
  timestamps: true,
}, { _id: false })

ArticleSchema.plugin(uniqueValidator, {
  message: 'is already taken'
})
ArticleSchema.plugin(AutoIncrement, { model: 'article', id: 'articleId_counter' });
const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article;