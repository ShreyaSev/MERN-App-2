import TodoItem from "./TodoItem";
import axios from "axios";

const deleteTodo = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/todos/${id}`);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }; 

const TodoList  = ({todos}) =>{
    return(
        <div>
            <ul>
                {todos.map(todo=>(
                <TodoItem key = {todo._id} todo = {todo} handleDelete = {deleteTodo} />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;