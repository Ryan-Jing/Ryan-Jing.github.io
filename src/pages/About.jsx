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

  // useEffect(() => {
  //   const header = document.getElementById("fadein1");
  //   const duration = 1000; // Animation duration in milliseconds
  //   const start = performance.now();
    
  //   const easeInOutQuad = t => t<.5 ? 2*t*t : -1+(4-2*t)*t;
    
  //   const fade = () => {
  //     const elapsed = performance.now() - start;
  //     const progress = Math.min(elapsed / duration, 1); // Ensure progress doesn't exceed 1
  //     const easedProgress = easeInOutQuad(progress);
  //     header.style.opacity = easedProgress;
      
  //     if (progress < 1) {
  //       window.requestAnimationFrame(fade);
  //     } else {
  //       setIsTextVisible(true); // Start text fade-in animation after header animation completes
  //     }
  //   };
    
  //   fade();
  // }, []);


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
            <Link to ="/" className="navbar_links">
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
      
    <div class = "Profile_Header">
        <p1 className = "fade-in">
          Profile
        </p1>

        <img className="Profile_Image " src="/ProfileImage.JPG" alt="Fading Image"/>

        <p2 className = "fade-in">
        I'm Ryan Jing, an undergraduate student majoring in Biomedical Engineering at the University of Waterloo. 🔬 I am deeply passionate about acquiring new skills and undertaking meaningful projects. 💡 My interests extend beyond academics, encompassing music 🎵, visual art 🎨, sports (with a special focus on winter sports ⛷️), and culinary pursuits 🍳.

        Currently, I am actively searching for co-op opportunities to enhance my knowledge and skills, expand my professional network, and establish myself as a promising engineer in the field. 🚀 I would welcome the opportunity to connect and explore potential collaborations.        </p2>
    </div>
    <div>
      <h1 className='Experience_Header'>
          Experience
      </h1>
    </div>

    <br/><br/><br/><br/><br/><br/>

    <footer>
        <footerContainer className = "footer">
            <footerContent>
                  <a href = "https://github.com/Ryan-Jing" target="_blank"> 
                    Github
                  </a>
            </footerContent>
        </footerContainer>

      </footer>
  </>
  );
};

export default About;
