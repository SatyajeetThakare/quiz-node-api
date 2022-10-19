const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const TaskSchema = new mongoose.Schema({
  _id: Number,
  // title: {
  //   type: String,
  //   unique: true,
  //   required: [true, 'can\'t be blank'],
  //   index: true,
  //   alias: 'task',
  // },
  description: {
    type: String,
    required: [true, 'can\'t be blank'],
    index: true,
    alias: 'task',
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedOn: {
    type: Date
  },
  remarks: {
    type: String
  },
  reason: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
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

TaskSchema.plugin(uniqueValidator, {
  message: 'is already taken'
})
TaskSchema.plugin(AutoIncrement, { model: 'task', id: 'taskId_counter' });
const Task = mongoose.model('Task', TaskSchema)

module.exports = Task;