const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const DistrictSchema = new mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    unique: true,
    required: [true, 'can\'t be blank'],
    index: true,
    alias: 'district',
  },
  code: {
    type: String,
  },
  state: {
    type: Number,
    ref: 'District'
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

DistrictSchema.plugin(uniqueValidator, {
  message: 'is already taken'
})
DistrictSchema.plugin(AutoIncrement, { model: 'district', id: 'districtId_counter' });
const District = mongoose.model('District', DistrictSchema)

module.exports = District;