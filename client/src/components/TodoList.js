import TodoItem from "./TodoItem";
import axios from "axios";



const TodoList  = ({todos, setTodos}) =>{

    const deleteTodo = async (id) => {
        try {
          const res = await axios.delete(`http://localhost:5000/todos/${id}`);
          console.log(res);
          axios.get('http://localhost:5000/todos') //request response from server
          .then(response => setTodos(response.data)) //setTodos is used to update the state of todos ; then function is used as a "promise-chain" - once response returns successfully, executes the function inside
          .catch(error => console.error(error)); //error handling
        } catch (error) {
          console.error(error);
        }
      }; 

    return(
        <div>
            <ul className="list-group todos mx-auto text-light">
                {todos.map(todo=>(
                <TodoItem key = {todo._id} todo = {todo} handleDelete = {deleteTodo} />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;