import TodoItem from "./TodoItem";
import axios from "axios";
import {deleteTodo, getAllTodos} from "../services/api";


const TodoList  = ({todos, setTodos}) =>{

    const handleDeleteTodo = async (id) => {
        try {
        const res = await deleteTodo(id);
        getAllTodos().then(data => setTodos(data)) //setTodos is used to update the state of todos ; then function is used as a "promise-chain" - once response returns successfully, executes the function inside
          .catch(error => console.error(error)); //error handling
        } catch (error) {
          console.error(error);
        }
      }; 

    return(
        <div>
            <ul className="list-group todos mx-auto text-light">
                {todos.map(todo=>(
                <TodoItem key = {todo._id} todo = {todo} handleDelete = {handleDeleteTodo} />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;