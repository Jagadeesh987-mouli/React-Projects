import { useState } from 'react';
import './App.css';
import 'animate.css';

export default function App()
{
  const [tasks, setTasks] = useState(["morning", "afternoon", "evening", "night", "fool"]);
  const [completed, setCompleted] = useState(["Completed task 1", "Completed task 2", "completed task 3"]);
  const [text, setText] = useState("");

  const completeTheTask = (place) =>{

    setTimeout(()=>{
      let t = tasks.splice(place,1)
      setCompleted([...completed,t])
      console.log(tasks)
      setTasks([...tasks])
    },500)
  }

  const deleteTheTask = (place) =>{
    tasks.splice(place,1);
    setTasks([...tasks]);
  }

  return(
    <>
      <div className="container">
        <header>
          <h1 className='animate__animated animate__bounceInDown' >
            <span id='heading'>To-Do-List</span>
          </h1>
        </header>
        <section>
          <div className="inner animate__animated animate__zoomIn" id="inputBox">
            <input 
              id='inp' 
              type="text" 
              placeholder='Enter your tasks here...'
              onChange={ (e) =>{ setText(e.target.value) } }
            />
            <button 
              id='add' onClick={ ()=> { 
              setTasks([...tasks, text]) 
              setText('')
              } } 
            >Add Task</button>
          </div>
          <div className="inner" id="taskBox">
            <div className="tasks animate__animated animate__fadeInLeftBig" id="ongoing">
              <div className='header'>
                <h3 className='wavy-underline'>On Going Tasks</h3>
              </div>
              <div className='taskListDiv'>
                <ul className='taskList'>
                  {
                    tasks.map((task,index)=>{
                      return (
                        <span id='task' key={index}>
                          <li className='item'>{task}</li>
                          <div id='btns'>
                            <button className='btn' id='complete-btn' onClick={ ()=>{ completeTheTask(index) } } >Complete</button>
                            <button className='btn' id='delete-btn' onClick={ ()=>{ deleteTheTask(index) } } >Delete</button>
                          </div>
                        </span>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
            <div className="tasks animate__animated animate__fadeInRightBig" id="completed">
              <div className='header'>
              <h3 className='wavy-underline'>Completed Tasks</h3>
              </div>
              <div className='taskListDiv'>
                <ul className='taskList'>
                  {
                    completed.map((task, index)=>(<li className='item' key={index}>{task}</li>))
                  }
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}