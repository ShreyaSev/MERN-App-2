import axios from 'axios';

const API_BASE_URL = "http://localhost:5000/api"

export const addTodo = async (task) => {//async function that handles adding a todo
    try {
      const response = await axios.post(`${API_BASE_URL}/todos`, { task });//posts a request to the todos path with the task as the request body
      return response;
    } catch (error) {
      throw error;
    }
};

export const updateTask = async (todo, task) => {
        try{
            const response = await axios.put(`${API_BASE_URL}/todos/${todo._id}`, {task});
            // console.log(response);
            return response;
        } catch (error){
            // console.error(error);
            throw error
        }
    };

export const deleteTodo = async (id) => {
        try {
          const res = await axios.delete(`${API_BASE_URL}/todos/${id}`);
          return res;
        } catch (error) {
          throw error;
        }
      }; 

export const getAllTodos = async () => {
    try{
        const {data} = await axios.get(`${API_BASE_URL}/todos`) //request response from server
        return data;
    }
    catch (error){
      throw error;
    }
  };