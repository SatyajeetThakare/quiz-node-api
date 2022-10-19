const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const PodcastSchema = new mongoose.Schema({
  _id: Number,
  message: {
    type: String,
    unique: true,
    required: [true, 'can\'t be blank'],
    index: true,
    alias: 'podcast',
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

PodcastSchema.plugin(uniqueValidator, {
  message: 'is already taken'
})
PodcastSchema.plugin(AutoIncrement, { model: 'podcast', id: 'podcastId_counter' });
const Podcast = mongoose.model('Podcast', PodcastSchema)

module.exports = Podcast;