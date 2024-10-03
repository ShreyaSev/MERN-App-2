import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useVoice from './useVoice';
import { set } from 'mongoose';
import { addTodo } from '../services/api';
const TodoForm = ({ onAdd }) => {
  const [task, setTask] = useState('');
  const handleAddTodo = async () => {//async function that handles adding a todo
    try {
      // const response = await axios.post('http://localhost:5000/todos', { task });//posts a request to the todos path with the task as the request body
      const data = await addTodo(task);
      onAdd(data);//if request is successful, call onAdd function with the response data
      setTask('');//reset input form to empty string
    } catch (error) {
      console.error(error);
    }
  };

  const {
    text,
    isListening,
    listen,
    voiceSupported,
  } = useVoice();

  useEffect(() => {
    setTask(text);
  }, [text]);

  //input form, text input, on change, setTask to the value of the input
  //on add, call addtodo which resets the input form to empty string
  return (
    <div className='text-center'>
      <form className="add text-center my-4">
      <label className="text-light">Add a new todo...</label>
      <br/>
      <input className = "m-auto px-2" name = "add" type="text" value={task} onChange={(e) => setTask(e.target.value)}/> 
      <i className="fas fa-microphone microphone m-2" onClick={listen}></i>
      <div className="text-center">
          <button type="submit" onClick={handleAddTodo} className="btn btn-light">Add Todo</button>
        </div>
      </form>
    </div>
  );
};
export default TodoForm;