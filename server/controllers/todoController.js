const Todo = require('../models/Todo'); //import the Todo model

exports.getAllTodos =  async (req, res) => {
    try{
        const todos = await Todo.find(); //wait until todo.find returns data from the model
        res.json(todos);//return response as json
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
  };

exports.createTodo = async (req, res) => {
    try{
        const newTodo = new Todo(req.body);
        await newTodo.save();
        res.json(newTodo)
      }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

exports.updateTodo = async (req, res) => {
    try{
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(updatedTodo); //send back to client as the response
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

exports.deleteTodo = async (req, res) => {
    try{
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: 'Todo deleted successfully' });
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};
