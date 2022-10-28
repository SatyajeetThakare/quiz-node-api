const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const StateSchema = new mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    unique: true,
    required: [true, 'can\'t be blank'],
    index: true,
    alias: 'state',
  },
  code: {
    type: String,
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

StateSchema.plugin(uniqueValidator, {
  message: 'is already taken'
})
StateSchema.plugin(AutoIncrement, { model: 'state', id: 'stateId_counter' });
const State = mongoose.model('State', StateSchema)

module.exports = State;