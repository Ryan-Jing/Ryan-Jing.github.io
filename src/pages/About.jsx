import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import profile from '/profile-head.ico'
import './App.css'

function About(){

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  window.addEventListener('scroll', function(){
    let header = document.querySelector('nav');
    let windowPosition = window.scrollY > 0;
    header.classList.toggle('scrolling_active', windowPosition )
  })

  useEffect(() => {
    const header = document.getElementById("fadein1");
    const duration = 1000; // Animation duration in milliseconds
    const start = performance.now();
    
    const easeInOutQuad = t => t<.5 ? 2*t*t : -1+(4-2*t)*t;
    
    const fade = () => {
      const elapsed = performance.now() - start;
      const progress = Math.min(elapsed / duration, 1); // Ensure progress doesn't exceed 1
      const easedProgress = easeInOutQuad(progress);
      header.style.opacity = easedProgress;
      
      if (progress < 1) {
        window.requestAnimationFrame(fade);
      } else {
        setIsTextVisible(true); // Start text fade-in animation after header animation completes
      }
    };
    
    fade();
  }, []);


  return (
    <>
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
            <Link to ="/" className="navbar_links" onClick={scrollToWork}>
                  Work
              </Link>
          </li>

          <li className="navbar_btn">
              <Link to = "/Contact" className="contact_button">
                  Contact Me
              </Link>
          </li>

        </ul>
      </div>
    </nav>
      
    {/* <h1>About Me Page</h1> */}
    <div class = "Profile_Header">
        <p1 id = "fadein1">
          Profile
        </p1>

        {/* FIGURE OUR FADING IN FOR IMAGE */}

        <img className="Profile_Image " src="/ProfileImage.JPG" alt="Fading Image" />

        <p2>
          My name is Ryan Jing. I am a Biomedical Engineering undergraduate student at the University of Waterloo. I have a strong passion for learning new skills and creating meaningful projects. My hobbies include music, visual art, sports (especially winter sports), and cooking. I am actively seeking co-op opportunities to expand my knowledge and skills further, broaden my professional network, and establish myself as a promising engineer in the field.
        </p2>
    </div>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

  </>
  );
};

export default About;
