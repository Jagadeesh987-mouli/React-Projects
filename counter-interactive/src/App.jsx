import { useState } from 'react';
import './App.css';

function App()
{
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [start, setStart] = useState(0);
  const [count, setCount] = useState(0);
  const [i, setI] = useState(1);
  const [info, setInfo] = useState("");

  const increment = () => {
    verifyInputValues();
    if (count + i > max || count === max) {
      setInfo("You are on the edge, Can't increase more");
    } else if (count < max) {
      setCount(count + i);
    }
  };

  const decrement = () => {
    verifyInputValues();
    if (count - i < min || count === min) {
      setInfo("You are on the edge, Can't decrease more");
    } else if (count > min) {
      setCount(count - i);
    }
  };

  const resetCount = ()=>{
    setCount(start);
  }
  const minimumValue = (e)=>{
    setMin(Number(e.target.value));
  }
  const incrementValue = (e) =>{
    setI(Number(e.target.value));
  }
  const setStartingValue = (e)=>{
    setStart(Number(e.target.value));
  }
  const maximumValue = (e)=>{
    setMax(Number(e.target.value));
  }
  const setValues = ()=>{
    setCount(start);
    verifyInputValues();
  }

  

  const verifyInputValues = ()=>
  {    
    console.log('min : '+min, 'max : '+max, 'count : '+count, 'i : '+i, 'start : '+start);
      console.log('max<count  : '+max<count); 
      if(max<count || max<start)
      {
        setInfo("Wrong Input, Maximum value cannot be less than count");
      }
      else if(min>count || min>start)
      {
        setInfo("Wrong Input, Minimum value cannot be more than count");
      }
      else if(max==0 && min==0)
      {
        setInfo("Enter some values in the above input boxes...")
      }
      else
      {
        setInfo("Let Set Count...");
      }
  
      if(i<1)
      {
        setInfo("Increment value cannot be zero or negative")
      }
      console.log('min : '+min, 'max : '+max, 'count : '+count, 'i : '+i, 'start : '+start);
      console.log('max<count  : '+max<count);
  }


  return(
    <>
        <h1 id='heading'>INTERACTIVE COUNTER</h1>
        <div className='outer'>
          <div id="child1">
            <div>
              <p className='text'>Enter minimum value</p>
              <input className='inp' type="number" value={min} onChange={minimumValue} />
            </div>
            <div>
              <p className='text'>Enter increment value</p>
              <input className='inp' type="number" value={i} onChange={incrementValue} />
            </div>
            <div>
              <p className='text'>Enter starting value</p>
              <input className='inp' type="number" value={start} onChange={setStartingValue} />
            </div>
            <div>
              <p className='text'>Enter maximum value</p>
              <input className='inp' type="number" value={max} onChange={maximumValue} />
            </div>
          </div>
          <div id="child2">
            <button id='set' onClick={setValues}>Apply</button>
          </div>
          <div id="child3">
            <p id='num'>{count}</p>
          </div>
          <div id="child4">
            <p id='errorText'>{info}</p>
            <div id='buttons'>
              <button onClick={increment} className='btn'>+</button>
              <button onClick={resetCount} className='reset'>Reset</button>
              <button onClick={decrement} className='btn'>-</button>
            </div>
          </div>
        </div>
    </>
  )
}

export default App;