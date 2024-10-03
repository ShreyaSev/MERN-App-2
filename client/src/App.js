import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
// import './styles/App.css';
import './styles/PurpleStyle.css';
import {getAllTodos} from "./services/api";
const App = () => {
  const [todos, setTodos] = useState([]); //todos is an array and can be modified using setTodos
  useEffect(() => {
    // Function to fetch data from the server
    const fetchData = async () => {
      try {
        const data = await getAllTodos();
        setTodos(data); // Update the state with the fetched data
      } catch (error) {
        console.error('Error fetching data:', error); // Error handling
      }
    };
    fetchData(); // Call the fetchData function when the component mounts
  }, []);
  const handleOnAdd = (newTodo) => {
  setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  return (
    <div className="container">
      <div className="text-center text-light my-4">
        <h1 className="mb-4">Todo List</h1>
        <TodoForm onAdd = {handleOnAdd} />
      </div>
      <TodoList todos = {todos} setTodos = {setTodos} />
    </div>
  );
};
export default App;