const TodoItem = ({todo, handleDelete}) =>{
    return(
        <div onDoubleClick={()=> handleDelete(todo._id)}>
            <li key={todo._id}>{todo.task}</li>
        </div>
    )
}

export default TodoItem;