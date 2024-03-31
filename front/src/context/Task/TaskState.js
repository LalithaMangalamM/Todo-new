import axios from "axios";
import { toast } from 'react-hot-toast'
import { useState } from "react";
import TodoContext from "./TaskContext";
import { useCookies } from "react-cookie";

const TaskState = (props)=>{    
    const [cookies, setCookie] = useCookies();

    const [tasks, setTasks] = useState([]);

    const headers = {
        'Content-Type': 'application/json',
        'token': cookies.token
      }

    // getting tasks 
    const getTasks = async (todoId) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/getTasks/${todoId}`, {
                headers
            });
            setTasks(res.data.tasks);
        } catch (error) {
            toast.error("Error fetching tasks:", error);
            // Handle the error, e.g., show a user-friendly message
        }
    };
    
    const addTask = async (todoId, task) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/addTask/${todoId}`, {
                main: task
            }, {
                headers
            });
            const newTasks = res.data.todo.tasks.slice();
            setTasks(newTasks);
            toast.success("Task added")
        } catch (error) {
            toast.error("Error adding task:", error);
            // Handle the error, e.g., show a user-friendly message
        }
    };
    
    const checkTask = async (todoId, taskId) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/checkTask/${todoId}/${taskId}`, {}, {
                headers
            });
            const newTasks = res.data.todo.tasks.slice();
            setTasks(newTasks);
        } catch (error) {
            toast.error("Error checking task:", error);
            // Handle the error, e.g., show a user-friendly message
        }
    };
    
    const editTask = async (todoId, taskId, editedPart) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/editTask/${todoId}/${taskId}`, editedPart, {
                headers
            });
            const newTasks = res.data.todo.tasks.slice();
            setTasks(newTasks);
            toast.success("Task edited successfully")
        } catch (error) {
            toast.error("Error editing task:", error);
            // Handle the error, e.g., show a user-friendly message
        }
    };
    
    const deleteTask = async (todoId, taskId) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/deleteTask/${todoId}/${taskId}`, {}, {
                headers
            });
            const newTasks = res.data.todo.tasks.slice();
            setTasks(newTasks);
            toast.success("Task Removed Successfully")
        } catch (error) {
            toast.error("Error deleting task:", error);
            // Handle the error, e.g., show a user-friendly message
        }
    };
    


    return(

        <TodoContext.Provider value={{getTasks, tasks, addTask, checkTask, editTask, deleteTask}}>
            {
                props.children
            }
        </TodoContext.Provider>
    )
}

export default TaskState;