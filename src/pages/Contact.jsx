import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Route, Link, NavLink } from "react-router-dom";
import profile from '/profile-head.ico'
import contactOne from '/ContactMe1.png'
import contactTwo from '/ContactMe2.png'
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
      
    <h1>Contact Me</h1>

    <div id="cf3" className='contact_background'>
        <img className="bottom" src= {contactOne} />
        <img className="top"  src= {contactTwo}/>
    </div>

    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className = "form_content"/>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className = "form_content" />
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" className = "form_content"></textarea>
      <button type="submit" className = "form_submit">Submit</button>
    </form>
  </>
  );
};

export default Contact;