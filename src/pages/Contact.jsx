import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Route, Link, NavLink } from "react-router-dom";
import profile from '/profile-head.ico'
import contactOne from '/ContactMe3.png'
import contactTwo from '/ContactMe4.png'
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

  function copyToClipboard(text) {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send data to backend for processing and saving (using APIs, server, etc.)
    const formData = { name, email, message };
    try {
      const response = await fetch('http://localhost:5173/api/saveFormData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    
      if (response.ok) {
        // Handle successful response (e.g., show a success message to the user)
        console.log('Data saved successfully');
      } else {
        // Handle error response (e.g., show an error message to the user)
        console.error('Error saving data');
      }
    } catch (error) {
      // Handle fetch error (e.g., show an error message to the user)
      console.error('Fetch error:', error);
    }
  };

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
              <Link to ="/" className="navbar_links">
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
      
    <h1>Contact Me</h1>

    <h2 className="Contact_Info">
      You can always reach me through my contact info below:
      <ul>
        <li>Email: <a1>r5jing@uwaterloo.ca</a1></li>
        <li>Cell: <a1>(647) 972 1223</a1></li>
        <li>LinkedIn: <a href="https://www.linkedin.com/in/ryan-jing-577201216" target="_blank" >Ryan Jing</a></li>
      </ul>
      Alternatively, you can fill out this form below to send me a personlized message. (Work in progress. Sorry!)
    </h2>
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className = "form_content"/>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className = "form_content" />
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" className = "form_content"></textarea>
      <button type="submit" className = "form_submit">Submit</button>
    </form>

    <div id="cf4" className='contact_background'>
        <img className="bottomContact" src= {contactOne} />
        <img className="topContact"  src= {contactTwo}/>
    </div>

    {/* <div class="footerContainer">
        <div class = "footerContent">
              <a href = "https://github.com/Ryan-Jing" target="_blank"> 
                Github
              </a>
        </div>
    </div> */}

  </>
  );
};

export default Contact;