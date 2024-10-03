import React, { useState, useEffect, useRef} from 'react';
import { updateTask } from '../services/api';
import axios from 'axios';

const TodoItem = ({ todo, handleDelete }) => {
    const [task, setTask] = useState(todo.task);
    const [toggle, setToggle] = useState(true);
    const initialRender = useRef(true);
    const this_todo = useRef(todo);
    // const toggle = useRef(true);

    const handleUpdateTask = async (todo, task) => {
        try{
            // const response = await axios.put(`http://localhost:5000/todos/${todo._id}`, {task});
            const response = await updateTask(todo, task);
            console.log(response);
        } catch (error){
            console.error(error);
        }
    };
    useEffect(()=>{
        //call the database update function

        if(!initialRender.current && toggle){
            handleUpdateTask(this_todo.current, task);
        }
        else{
            initialRender.current = false;
        }
    }, [task, toggle]);

    return (
        toggle ? (
            <div onDoubleClick = {()=>{setToggle(false)}}>
                <li className='list-group-item d-flex justify-content-between align-items-center todoitem m-1' key={todo._id} >
                    <span>{task}</span>
                {/* <button onClick={() => handleDelete(todo._id)}>Delete</button>
                    </li>  */}
                <i className='far fa-trash-alt delete m-1' onClick={() => handleDelete(todo._id)}></i>
                </li>
                {/* <Button variant="danger" onClick={() => handleDelete(todo._id)}>Delete</Button> */}
            </div>
        ) : (
                <input
                    type="text"
                    value={task}
                    className='px-2 todoitem m-1'
                    onChange={(event) => setTask(event.target.value)}
                    onBlur={() => setToggle(true)}
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
