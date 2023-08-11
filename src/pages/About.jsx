import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import profile from '/profile-head.ico'
import './App.css'

function About(){

  window.addEventListener('scroll', function(){
    let header = document.querySelector('nav');
    let windowPosition = window.scrollY > 0;
    header.classList.toggle('scrolling_active', windowPosition )
  })

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
      
    <h1>About Me Page</h1>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

  </>
  );
};

export default About;
