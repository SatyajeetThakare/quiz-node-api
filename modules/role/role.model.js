const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const RoleSchema = new mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    unique: true,
    required: [true, 'can\'t be blank'],
    index: true,
    alias: 'role',
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
  },
  updatedBy: {
    type: mongoose.Schema.Types.Mixed,
  }
}, {
  timestamps: true,
}, { _id: false })

RoleSchema.plugin(uniqueValidator, {
  message: 'is already taken.',
})
RoleSchema.plugin(AutoIncrement, { model: 'role', id: 'roleId_counter' });
const Role = mongoose.model('Role', RoleSchema)

module.exports = Role;