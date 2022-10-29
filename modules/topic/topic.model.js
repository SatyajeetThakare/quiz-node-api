const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const TopicSchema = new mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    unique: true,
    required: [true, 'can\'t be blank'],
    index: true,
    alias: 'topic',
  },
  description: {
    type: String,
  },
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

TopicSchema.plugin(uniqueValidator, {
  message: 'is already taken'
})
TopicSchema.plugin(AutoIncrement, { model: 'topic', id: 'topicId_counter' });
const Topic = mongoose.model('Topic', TopicSchema)

module.exports = Topic;