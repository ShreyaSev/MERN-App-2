import React, { useState } from 'react';
import axios from 'axios';
const TodoForm = ({ onAdd }) => {
  const [task, setTask] = useState('');
  const addTodo = async () => {//async function that handles adding a todo
    try {
      const response = await axios.post('http://localhost:5000/todos', { task });//posts a request to the todos path with the task as the request body
      onAdd(response.data);//if request is successful, call onAdd function with the response data
      setTask('');//reset input form to empty string
    } catch (error) {
      console.error(error);
    }
  };

  //input form, text input, on change, setTask to the value of the input
  //on add, call addtodo which resets the input form to empty string
  return (
    <div>
      <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
      <button onClick={addTodo}>Add Todo</button>
    </div>
  );
};
export default TodoForm;