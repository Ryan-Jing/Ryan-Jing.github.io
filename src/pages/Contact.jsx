import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Route, Link, NavLink } from "react-router-dom";
import profile from '/profile-head.ico'
import './App.css'

function Contact(){

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              <NavLink to = "/About" className="navbar_links" activeClassName="active">
                  About Me
              </NavLink>
          </li>

          <li className="navbar_item">
              <Link to ="/" className="navbar_links" onClick={scrollToWork}>
                  Work
              </Link>
          </li>

          <li className="navbar_btn">
              <NavLink to = "/Contact" className="contact_button" activeClassName="active">
                  Contact Me
              </NavLink>
          </li>

        </ul>
      </div>
    </nav>
      
    <h1>Contact Me Page</h1>

    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

  </>
  );
};

export default Contact;