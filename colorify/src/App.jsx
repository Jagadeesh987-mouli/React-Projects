import { useRef, useState } from 'react';
import './App.css';
import screenshot from 'html2canvas'
import html2canvas from 'html2canvas';

function App()
{
  const image = useRef(null);
  const [tColor, setTColor] = useState('000');
  const [bgColor, setBgColor] = useState('000');

  const changeTextColor = (colorName) =>{
    image.current.style.color=colorName;
  }
  const changeBgColor = (colorName) =>{
    image.current.style.backgroundColor= colorName;
  }

  const changeFont = (fontName) =>{
    image.current.style.fontFamily= fontName;
  }

  const downloadImage = () => {
    if (image.current) {
      html2canvas(image.current).then((canvas) => {
        const imageData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imageData;
        link.download = 'colorify.png';
        link.click();
      }).catch((error) => {
        console.error('Error capturing screenshot:', error);
      });
    } else {
      console.error('Image reference is not valid');
    }
  };
  

  return(
    <>
      <header id="header">
        <h1 id="heading">COLORIFY</h1>
      </header>
      <section id='section' >
      <div ref={image} contentEditable>
          {/* Editable content goes here */}
      </div>
        <div id='outer'>
          <div id='left'>
            <h1 ref={image} contentEditable="true" id="textBox">Write your text...</h1>
            <button id='download' onClick={downloadImage} >Download</button>
          </div>
          <div  id='right'>
            <div className="child">
              <p>Choose text color</p>
              <div id='color'>
                <button id='red' onClick={() => changeTextColor('red')} ></button>
                <button id='green' onClick={() => changeTextColor('green')}></button>
                <button id='blue' onClick={() => changeTextColor('blue')}></button>
                <button id='yellow' onClick={() => changeTextColor('yellow')}></button>
                <button id='white' onClick={() => changeTextColor('white')}></button>
                <button id='black' onClick={() => changeTextColor('black')}></button>
                <input type="color"
                    value={tColor}
                    onChange={
                      (e) => {
                        setTColor(e.target.value)
                        changeTextColor(e.target.value)
                      }
                    }
                />
              </div>
            </div>
            <div className="child">
              <p>Choose background color</p>
              <div id='text'>
                <button id='red' onClick={() => changeBgColor('red')}></button>
                <button id='green' onClick={() => changeBgColor('green')}></button>
                <button id='blue' onClick={() => changeBgColor('blue')}></button>
                <button id='yellow' onClick={() => changeBgColor('yellow')}></button>
                <button id='white' onClick={() => changeBgColor('white')}></button>
                <button id='black' onClick={() => changeBgColor('black')}></button>
                <input 
                    type='color'
                    value={bgColor}
                    onChange={(e)=>{
                      setBgColor(e.target.value)
                      changeBgColor(e.target.value)
                    }}
                    />
              </div>
            </div>
            <div className="child">
              <p>Choose font style</p>
              <div id='font'>
                <h1 id='times-new' onClick={()=>{changeFont('Times New Roman')}}>Hello</h1>
                <h1 id='cursive' onClick={()=>{changeFont('cursive')}}>Hello</h1>
                <h1 id='verdana' onClick={()=>{changeFont('verdana')}}>Hello</h1>
                <h1 id='arial'  onClick={()=>{changeFont('arial')}}>Hello</h1>
                <h1 id='impact' onClick={()=>{changeFont('Impact')}}>Hello</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default App;