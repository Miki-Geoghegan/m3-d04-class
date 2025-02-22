import React, {useState, useEffect} from 'react';
import './App.css';


function App() {
  


  const [color, setColor] = useState()

  /* this following function is a call to an external API: */

  const getColor = () => {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)

    fetch(`http://www.thecolorapi.com/id?rgb=${r},${g},${b}`)
      .then(res => res.json())
      .then(res => { 
        console.log(res)
        setColor(res) /* set the state using the external response from the API, we need to run this once our component has been rendered the first time 
        We can do this with Hooks: We ask react to render something, only when we have a color on our state, therefore at the start, nothing has been rendered - see {color ?...} below*/
      })
  }

  useEffect(()=>getColor(), []) /* useEffect takes a callBack, in this instance getColor - by using it, we wait for the first render of the page, before getColor is called 
  By using useEffect we can get an external API working - useState would create an internal loop. We must call the external API After the first render (rendered in an empty state), then call the external API to fill the state with useEffect*/

  /* useEffect has three forms, it will run a function for you and then run it after every render in a continuous cycle:
  useEffect(()=>getColor())
  The second form has an empty array:
  useEffect(()=>getColor(), []) - this render ONLY after the first blank render
  The third one has a filled array with certain states that we want it to wait for i.e. useEffect(()=>getColor(), [color]) - it will wait for the state represented by the variable/varialbes in [] to change before running... typical example would be when you click a certain button i.e. show likes - once the user clicks, the button is on, need to interrogate an API, bring in the number of likes and display it to the user*/

  return (
    <div className="App">
      <h1>Hello Pizza Bytes</h1>

      {color ? <img src={color.image.named} /> : <p>no color on the state at present</p>}

      <button onClick={getColor}>Get new color</button> {/* we can call the function in this way - useEffect in the above form, means it will render only after the frist blank render - then you can run it manually... if we added [color], it would run in an infinate loop, so in this example, each time the colour changed it would run, changing the colour again */}
      
    </div>
  );
}

export default App;



/**
  useEffect(()=>getColor()) -> will run after every render, in a continuos cycle. This corresponds to the componentDidUpdate lifecycle
  useEffect(()=>getColor(), []) -> will render ONLY after the first blank render, this corresponds to the componentDidMount lifecycle
  useEffect(()=>getColor(), [color]) -> will wait for the state to change before running. This is special and runs only on a change of state
  
  useEffect(()=>{return console.log('runs on unmount')}) -> will run once the component is done, also called clean-up. This corresonds to a componentWillUnmount
*/