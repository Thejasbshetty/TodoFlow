const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }, // New field
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' }, // New field
  dueDate: { type: Date }, // New field for due date
  completed: { type: Boolean, default: false }, // Track completion status
  completionDate: { type: Date }, // Track completion date
});

module.exports = mongoose.model('Todo', TodoSchema);