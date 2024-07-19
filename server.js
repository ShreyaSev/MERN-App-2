const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
// Connect to MongoDB
mongoose.connect('mongodb://localhost/mern-stack-db', { useNewUrlParser: true, useUnifiedTopology: true });
// Define routes and middleware
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// defining a schema for our application
const todoSchema = new mongoose.Schema({
    task: String,
    completed: Boolean,
  });

const Todo = mongoose.model('Todo', todoSchema);


//listen for a get request at todos path. once a request is got, execute second parameter which is a function
app.get('/todos', async (req, res) => {
  const todos = await Todo.find(); //wait until todo.find returns data from the model
  res.json(todos);//return response as json
});


//CRUD operations for todo items
//create a new todo
app.post('/todos', async(req, res)=>{
  const newTodo = new Todo(req.body);
  await newTodo.save();
  res.json(newTodo)
});

//update existing todo
//update the todo identified by id, passed through the url
//route parameters indicated by :
app.put('/todos/:id', async(req, res)=>{
  //find the todo by id and update it with the request body, new:true tells mongoose to return the updated todo
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true});
  res.json(updatedTodo); //send back to client as the response
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
  await Todo.findByIdAndRemove(req.params.id);
  res.json({ message: 'Todo deleted successfully' });
});