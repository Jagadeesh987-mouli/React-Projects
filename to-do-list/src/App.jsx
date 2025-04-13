import { useState } from 'react';
import './App.css';
import 'animate.css';

export default function App()
{
  const [tasks, setTasks] = useState(["Sample Task 1", "Sample task 2", "Sample task 3", "Samole task 4"]);
  const [completed, setCompleted] = useState(["Completed task 1", "Completed task 2", "completed task 3"]);
  const [text, setText] = useState("");
  const [plusOne, setPlusOne] = useState("");
  const [minusOne, setMinusOne] = useState("");
  const completeTheTask = (place) =>{

    setTimeout(()=>{
      let t = tasks.splice(place,1)
      setCompleted([...completed,t])
      console.log(tasks)
      setTasks([...tasks])
      setPlusOne("plus");
    },500)
    setPlusOne("");
  }

  const deleteTheTask = (place) =>{
    setTimeout(()=>{
      tasks.splice(place,1);
      setTasks([...tasks]);
      setMinusOne("minus");
    },100)
    setMinusOne("");
  }

  return(
    <>
      <div className="container">
        <header>
          <h1 className='animate__animated animate__bounceInDown' >
            <span id='heading'>To-Do List</span>
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
              className='glow-button'
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
                          <div className='itemDiv'>
                            <span>{(index+1)}.</span><li className='item'>{task}</li>
                          </div>
                          <div id='btns'>
                            <button className='btn' id='complete-btn' onClick={ ()=>{ completeTheTask(index) } } >
                              <span className='text-label'>Complete</span>
                              <span className='emoji-label'>&#x2705;</span>
                            </button>
                            <button className='btn' id='delete-btn' onClick={ ()=>{ deleteTheTask(index) } } >
                              <span className='text-label'>Delete</span>
                              <span className='emoji-label'>&#x274C;</span>
                            </button>
                          </div>
                        </span>
                      )
                    })
                  }
                </ul>
              </div>
              <p id='hide' className={minusOne}>-1</p>
            </div>
            <div className="tasks animate__animated animate__fadeInRightBig" id="completed">
              <div className='header'>
                <h3 className='wavy-underline'>Completed Tasks</h3>
              </div>
              <div className='taskListDiv'>
                <ul className='taskList'>
                  {
                    completed.map((task, index)=>{
                      return(
                        <div className='itemDiv' key={index}>
                          <span>{(index+1)}.</span>
                          <li className='item'>{task}</li>
                        </div>
                      )
                  })
                  }
                </ul>
              </div>
              <p id='hide' className={plusOne}>+1</p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}