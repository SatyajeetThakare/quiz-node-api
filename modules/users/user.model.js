const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new mongoose.Schema({
  _id: Number,
  email: {
    type: String,
    unique: true,
    required: [true, 'can\'t be blank'],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true,
  },
  hash: String,
  name: {
    salutation: String,
    firstName: {
      type: String,
      index: true,
      required: [true, 'can\'t be blank'],
    },
    middleName: {
      type: String,
      index: true,
    },
    lastName: {
      type: String,
      index: true,
      required: [true, 'can\'t be blank'],

    },
    suffix: String,
    // required: [true, 'can\'t be blank']
  },
  mobileNumber: {
    type: Number,
  },
  address: {
    type: mongoose.Schema.Types.Mixed,
  },
  gender: {
    type: String,
    index: true,
  },
  role: {
    type: Number,
    ref: 'Role',
    default: 2,
    required: [true, 'can\'t be blank'],
  },
  image: {
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
  },
  hash: String,
  salt: String,
}, {
  timestamps: true,
}, { _id: false })

UserSchema.plugin(uniqueValidator, {
  message: 'is already taken.',
});

if(!mongoose.models.User){
  // accountSchema.plugin(AutoIncrement,{id:'userId_counter',inc_field:'userId' });
  UserSchema.plugin(AutoIncrement, { model: 'user', id: 'userId_counter' });
}

const User = mongoose.model('User', UserSchema);

module.exports = User;