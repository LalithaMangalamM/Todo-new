import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import TaskContext from '../../context/Task/TaskContext';
import TodoContext from '../../context/Todo/TodoContext';

const SideMenu = () => {

const taskContext = useContext(TaskContext);
const {tasks} = taskContext
  const todoContext = useContext(TodoContext);
  const { todos, getTodos} = todoContext;

  const navigate = useNavigate();

  const handleClickOnTodo = (todo_id,title)=>{
    navigate(`/${todo_id}/${title}`)
  }
// console.log(todos)

  useEffect(()=>{
    getTodos();
    // console.log("In")
  },[])
  // console.log(tasks)
  
  return (
    <div className='hidden sm:block w-[20vw] h-[95vh] bg-[#21212b] border-2 border-[#191920]'>
        <h1 className='text-[#bbbabf] font-bold text-[1.4rem] ml-8 mt-8'>
          TODOs
        </h1>
        <div className='text-[#c9c9cb] text-[1.2rem] font-[600]  my-6 h-[80vh] overflow-y-scroll'>
            {
              !todos?<h4 className='text-center mt-20 text-gray-500'>No <span className='text-pink-600'>TODOs</span> yet</h4>:todos.map(element=>{
                return(
                  <div key={element._id} onClick={()=>handleClickOnTodo(element._id,element.title)} className='hover:bg-[#262632] px-8  py-4 flex justify-between'>
                      <div className='flex gap-5'>
                      <div className={`rounded-xl w-[40px] h-[40px] bg-${element.color}-500`}></div>
                      <h4 className='text-[1.4rem]'>
                        {
                          element.title.length>15?element.title.slice(0,10).concat("..."):element.title
                        }
                      </h4>
                      </div>
                  </div>
                )
              })
            }         
        </div>
    </div>
  )
}

export default SideMenu