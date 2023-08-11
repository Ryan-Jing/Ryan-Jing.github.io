//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import backgroundOne from '../assets/background_images/background8.png'
import backgroundTwo from '../assets/background_images/background7.png'
import downButton from '../assets/down-arrow.png'
import profile from '/profile-head.ico'
import './App.css'

function App() {
  //const [count, setCount] = useState(0)
  window.addEventListener('scroll', function(){
    let header = document.querySelector('nav');
    let windowPosition = window.scrollY > 0;
    header.classList.toggle('scrolling_active', windowPosition )
  })

  // window.onload = function(){
  //   document.getElementById("fadein1").style.opacity = 1;
  // };

  useEffect(() => {
    const header = document.getElementById("fadein1");
    const duration = 250; // Animation duration in milliseconds
    const start = performance.now();
    
    const easeInOutQuad = t => t<.5 ? 2*t*t : -1+(4-2*t)*t;
    
    const fade = () => {
      const elapsed = performance.now() - start;
      const progress = Math.min(elapsed / duration, 1); // Ensure progress doesn't exceed 1
      const easedProgress = easeInOutQuad(progress);
      header.style.opacity = easedProgress;
      
      if (progress < 1) {
        window.requestAnimationFrame(fade);
      }
    };
    
    fade();
  }, []);

  // useEffect(() => {
  //   const header = document.getElementById("fadein1");
  //   header.style.opacity = 1;
  // });

  function scrollToWork() {
    const section = document.getElementById("scrollToWork");
    section.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest"});
  }

  window.onscroll = function(){
    document.getElementById("fadein2").style.opacity = 1;
  };

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
        <Link to="/" id="navbar_title" alt="Website logo">
            <img src= {profile}/>
        </Link>
          {/* <a href="index.html" id="navbar_title" alt="Website logo">
            Portfolio
          </a> */}

          <ul className ="navbar_menu">
            <li className="navbar_item">
                <Link to = "/About" className="navbar_links">
                    About Me
                </Link>
            </li>

            <li className="navbar_item">
                <a href="#Work" className="navbar_links" onClick={scrollToWork}>
                    Work
                </a>
            </li>

            <li className="navbar_btn">
                <Link to = "/Contact" className="contact_button">
                    Contact Me
                </Link>
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

              {/* <button className="scroll-button" onClick={scrollToNextSection}>
                <img className = "down-button" src={downButton}/>
              </button> */}
          </h1>

          <h1 class="header4" >
              <p id="scrollToWork">
                  My Work
              </p>
          </h1>

          {/* <h3 class="Descript_header">
              <p>
                  Software and Programming
              </p>
          </h3>

          <h3 class="Descript_content" id="fadein2">
              <p>
                With experience in various programming domains, I have developed a versatile skill set. Working on firmware using C during my time at Orbital honed my low-level programming abilities, allowing me to understand hardware interactions and optimize system performance. Collaborating with Ontario Health, I expanded my expertise to include JavaScript, Angular, and React, enabling me to create interactive and dynamic web applications. Additionally, delving into the realm of artificial intelligence and machine learning, I harnessed Python's power to leverage AI and ML tools to create unique solutions. 
                &nbsp;
              </p>
          </h3> */}
          {/* <div class="box">
              <div class="crop ratio ratio-1:1 ">
                  <iframe width="100%" height="100%" src="https://docs.google.com/spreadsheets/d/1SZ7rFdmEeR2oQ1xWxmmTTTjW1d4HtQNttZLdltmZNI0/edit#gid=1754425699" frameborder="0" scrolling="no" class="covid_graph" ></iframe>
              </div>
          </div> */}

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
