import React, {useState, useEffect} from 'react';
import './App.css';


function Example() {
  

  
  const [isLogged, setIsLogged] = useState(false)

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
      {/* the above will show EITHER the image (if there is a colour) OR the p tag (else) */}

      <button onClick={() => setIsLogged(!isLogged)}>{isLogged&& 'Log in'} {/* can combine more if you add () i.e. {(isLogged && true) && 'Log out'} */}
      {!isLogged && 'Log out'}</button> {/* this works because the boolean shortcut will return either a boolean OR something to render - react will not display null, undefined, true, false etc. it will result in React not rendering anything, so if it is one of these, nothing will render*/}

     {/*  the other way to do this would be with an if condition i.e. 
     if(isLogged) return 'Log out'
     else return 'Log in'
     This if condition would need to be wrapped inside a function which is too much code, the above is preferable */}

     {/* you could say when user is logged in I want to display logout as well as some image or text i.e.
     {isLogged && <p>Hello logged-in user</p>}, this is outside of the button 
     You could also create own element i.e. <MyGreetings />, this would look like:
     {isLogged && <MyGreetings />},*/}

    {/*  The boolean shortcut we have used only works when there are two possible values, i.e. on or off, the best syntax is {color ? <img src={} /> } : <p>Hello</p>*/}
      
    </div>
  );
}

export default App;
