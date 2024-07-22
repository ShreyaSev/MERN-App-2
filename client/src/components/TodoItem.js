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
                <li key={todo._id} >{task}</li> 
                <button onClick={() => handleDelete(todo._id)}>Delete</button>
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
