const TodoItem = ({todo}) =>{
    console.log(todo._id);
    return(
        <div>
            <li key={todo._id}>{todo.task}</li>
        </div>
    )
}

export default TodoItem;