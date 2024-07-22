import React, { useState, useEffect} from 'react';
import axios from 'axios';

const TodoItem = ({ todo, handleDelete }) => {
    const [task, setTask] = useState(todo.task);
    const [toggle, setToggle] = useState(true);
    const [initialRender, setInitialRender] = useState(true);
    useEffect(()=>{
        //call the database update function
        const updateTask = async () => {
            try{
                const response = await axios.put(`http://localhost:5000/todos/${todo._id}`, {task});
                console.log(response);
            } catch (error){
                console.error(error);
            }
        };

        if(!initialRender && toggle){
            updateTask();
        }
        else{
            setInitialRender(false);
        }
    }, [task, todo._id, initialRender, toggle]);

    return (
        toggle ? (
            <div onClick = {()=> {setToggle(false)}} onDoubleClick={() => handleDelete(todo._id)}>
                <li key={todo._id}>{task}</li>
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
