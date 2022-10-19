const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const EventSchema = new mongoose.Schema({
  _id: Number,
  title: {
    type: String,
    unique: true,
    required: [true, 'can\'t be blank'],
    index: true,
    alias: 'event',
  },
  description: {
    type: String,
  },
  eventDate: {
    type: Date,
    default: Date.now,
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
  completedBy: [{
    type: Number
  }],
  createdBy: {
    type: mongoose.Schema.Types.Mixed,
  },
  updatedBy: {
    type: mongoose.Schema.Types.Mixed,
  }
}, {
  timestamps: true,
}, { _id: false })

EventSchema.plugin(uniqueValidator, {
  message: 'is already taken'
})
EventSchema.plugin(AutoIncrement, { model: 'event', id: 'eventId_counter' });
const Event = mongoose.model('Event', EventSchema)

module.exports = Event;