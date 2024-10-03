const mongoose = require('mongoose');


// defining a schema for our application
const todoSchema = new mongoose.Schema({
    task: String,
    completed: Boolean,
  });

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;