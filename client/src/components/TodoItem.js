import React, { useState, useEffect, useRef} from 'react';
import axios from 'axios';

const TodoItem = ({ todo, handleDelete }) => {
    const [task, setTask] = useState(todo.task);
    const [toggle, setToggle] = useState(true);
    const initialRender = useRef(true);
    const this_todo = useRef(todo);
    // const toggle = useRef(true);

    const updateTask = async (todo, task) => {
        try{
            const response = await axios.put(`http://localhost:5000/todos/${todo._id}`, {task});
            console.log(response);
        } catch (error){
            console.error(error);
        }
    };
    useEffect(()=>{
        //call the database update function

        if(!initialRender.current && toggle){
            updateTask(this_todo.current, task);
        }
        else{
            initialRender.current = false;
        }
    }, [task, toggle]);

    return (
        toggle ? (
            <div onDoubleClick = {()=>{setToggle(false)}}>
                <li className='list-group-item d-flex justify-content-between align-items-center' key={todo._id} >
                    <span>{task}</span>
                {/* <button onClick={() => handleDelete(todo._id)}>Delete</button>
                    </li>  */}
                <i className='far fa-trash-alt delete' onClick={() => handleDelete(todo._id)}></i>
                </li>
                {/* <Button variant="danger" onClick={() => handleDelete(todo._id)}>Delete</Button> */}
            </div>
        ) : (
            <input
                type="text"
                value={task}
                onChange={(event) => setTask(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        setToggle(true);
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }}
            />
        )
    );
};

export default TodoItem;
