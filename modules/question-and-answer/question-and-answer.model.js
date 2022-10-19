const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const AutoIncrement = require('mongoose-sequence')(mongoose);
// const db = require('../../_helpers/db');
// const User = db.User;

const QuestionAndAnswerSchema = new mongoose.Schema({
  _id: Number,
  title: {
    type: String,
    unique: true,
    required: [true, 'can\'t be blank'],
    index: true,
    alias: 'question-and-answer',
  },
  description: {
    type: String,
  },
  answers: [{
    description: String,
    answeredBy: {
      type: mongoose.Schema.Types.Mixed,
      ref: 'User'
    },
    answeredOn: {
      type: Date,
      default: Date.Now
    },
  }],
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
  },
  isAnswered: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
}, { _id: false })

QuestionAndAnswerSchema.plugin(uniqueValidator, {
  message: 'is already taken'
})
QuestionAndAnswerSchema.plugin(AutoIncrement, { model: 'question-and-answer', id: 'questionId_counter' });
const QuestionAndAnswer = mongoose.model('Question-And-Answer', QuestionAndAnswerSchema);

module.exports = QuestionAndAnswer;