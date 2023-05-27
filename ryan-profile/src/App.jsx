//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import backgroundOne from './assets/background_images/background4.png'
import backgroundTwo from './assets/background_images/background5.png'
import './App.css'

function App() {
  //const [count, setCount] = useState(0)
  window.addEventListener('scroll', function(){
    let header = document.querySelector('nav');
    let windowPosition = window.scrollY > 0;
    header.classList.toggle('scrolling_active', windowPosition )
  })

  window.onload = function(){
  document.getElementById("fadein1").style.opacity = 1;


  window.onscroll = function(){
  document.getElementById("fadein2").style.opacity = 1;
  }}

  return (
    <>

      <div id="cf3" className='background_image'>
            <img className="bottom" src= {backgroundOne} />
            <img className="top"  src= {backgroundTwo}/>
      </div>
      <nav className = "navbar">
        <div className = "navbar_container">
          <a href="index.html" id="navbar_title" alt="Website logo">
            Portfolio
          </a>

          <ul className ="navbar_menu">
            {/* <li className="navbar_item">
                <a href="AboutMe.html" className="navbar_links">
                    About Me
                </a>
            </li> */}

            <li className="navbar_item">
                <a href="#Work" className="navbar_links">
                    Work
                </a>
            </li>

            <li className="navbar_btn">
                <a className="button" href="mailto:r5jing@uwaterloo.ca">
                    Contact Me
                </a>
            </li>

          </ul>
        </div>
      </nav>

      <header id="fadein1" className="fadein1">

            <h1 className="header">
                <p>
                    Ryan Jing!!
                </p>
            </h1>

            <h2 className="header2" >
                <p>
                    Programming &nbsp; &nbsp; &nbsp; Design &nbsp; &nbsp; &nbsp; CAD &nbsp; &nbsp; &nbsp; Arts           
                </p>
            </h2>

        </header>
      
      
      
      {/*
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Ryan Jing</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
       */}

       <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </>
  )
}

export default App
