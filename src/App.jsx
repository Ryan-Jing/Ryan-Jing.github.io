//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import React, { useState, useRef } from 'react';
import backgroundOne from './assets/background_images/background4.png'
import backgroundTwo from './assets/background_images/background5.png'
import downButton from './assets/down-arrow.png'
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

  const scrollRef = useRef(null);
  const scrollToNextSection = () => {
    const scrollOffset = 200; // Adjust this value as needed
    const scrollPosition = scrollRef.current.offsetTop - scrollOffset;
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  };
  
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
            <li className="navbar_item">
                <a href="AboutMe.html" className="navbar_links">
                    About Me
                </a>
            </li>

            <li className="navbar_item">
                <a href="#Work" className="navbar_links">
                    Work
                </a>
            </li>

            <li className="navbar_btn">
                <a className="contact_button" href="mailto:r5jing@uwaterloo.ca">
                    Contact Me
                </a>
            </li>

          </ul>
        </div>
      </nav>

      <header id="fadein1" className="fadein1">

        <h1 className="header">
            <p>
                Ryan Jing
            </p>
        </h1>
        <h2 className="header2" >
            <p>
                Programming &nbsp; &nbsp; &nbsp; Design &nbsp; &nbsp; &nbsp; CAD &nbsp; &nbsp; &nbsp; Arts           
            </p>
        </h2>
        <button className="scroll-button" onClick={scrollToNextSection}>
          <img className = "down-button" src={downButton}/>
        </button>
      </header >
      
      <div>
        <main>
          <h1 class="header3" id="fadein2" ref={scrollRef}>
              <p>
                  I'm a candidate for a BASc in Biomedical Engineering, and pursuing a specialization in Neural Engineering. I have a passion for 3D CAD Modelling, Coding, and Visual Design. I'm currently seeking new work opportunities and experiences to expand my skills and abilities.
              </p>
          </h1>
        </main>
      </div>

      
      
      
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
