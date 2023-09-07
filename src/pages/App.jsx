import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import backgroundOne from '../assets/background_images/background8.png'
import backgroundTwo from '../assets/background_images/background7.png'
import downButton from '../assets/down-arrow.png'
import profile from '/profile-head.ico'
import whiteStrip from '/white_strip.jpg'
import ArduinoVideo from '/ArduinoProjectDemoCompressed.mp4'
import EMGClawCad from '/EMGClawCad.png'
import LegoPosed from '/LegoPosed.png'
import LegoExplode from '/LegoExplode.png'

import './App.css'

function App() {
  //const [count, setCount] = useState(0)
  window.addEventListener('scroll', function(){
    let header = document.querySelector('nav');
    let windowPosition = window.scrollY > 0;
    header.classList.toggle('scrolling_active', windowPosition )
  })

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

    // window.onscroll = function(){
    //   document.getElementById("fadein2").style.opacity = 1;
    // };
  
    // UPDATE THIS BUTTON SYSTEM TO MAKE MORE INTUITIVE AND NOT HARD CODING
  
    const scrollRef1 = useRef(null);
    const scrollRef2 = useRef(null);
    const scrollRef3 = useRef(null);

    const scrollToWorkSection = () => {
      const scrollOffset = 200; // Adjust this value as needed
      const scrollPosition = scrollRef2.current.offsetTop - scrollOffset;
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    };
  
    const scrollToNextSectionOne = () => {
      const scrollOffset = 200; // Adjust this value as needed
      const scrollPosition = scrollRef1.current.offsetTop - scrollOffset;
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    };
  
    const scrollToNextSectionTwo = () => {
      const scrollOffset = 150; // Adjust this value as needed
      const scrollPosition = scrollRef2.current.offsetTop - scrollOffset;
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    };

    const scrollToNextSectionThree = () => {
      const scrollOffset = 150; // Adjust this value as needed
      const scrollPosition = scrollRef3.current.offsetTop - scrollOffset;
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
          <a href="/" id="navbar_title" alt="Website logo">
            <img src={profile} />
          </a>
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
                <a href="#Work" className="navbar_links" onClick={scrollToWorkSection}>
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
        <button className="scroll-button" onClick={scrollToNextSectionOne}>
          <img className = "down-button" src={downButton}/>
        </button>
      </header >
      
      <div>
        <main>
          <h1 class="header3" ref={scrollRef1}>
              <p>
                  I'm a candidate for a BASc in Biomedical Engineering, and pursuing a specialization in Neural Engineering. I have a passion for Software, Firmware, Rapid Prototyping, CAD, Visual design, Leadership, and Teamwork. I'm continually seeking new opportunities and experiences to expand my skills and abilities to be applied in my own work and projects with the goal of improving the lives of others always in mind.
              </p>
          </h1>

          <button className="scroll-button1" onClick={scrollToNextSectionTwo}>
            <img className = "down-button" src={downButton}/>
          </button>

          <h1 class="header4" ref={scrollRef2}>
              <p id="scrollToWork">
                  My Work
              </p>
          </h1>

          <h3 class="Descript_header">
              <p>
                  Software and Firmware
              </p>
          </h3>

          <h3 class="Descript_content">
              <p>
              The applications of software and firmware as a Biomedical Engineer are endless. I am continuously creating projects that develop my programming skills, with my objective being to create optimal solutions to improve the health of others. I'm exploring applications of AI, and below is a projects I worked on that live-translates speech and output the desired translation on an LCD screen.                &nbsp;
              </p>
          </h3>
          
          <div class = "Arduino_video" >
            <video controls width="832" height="468">
              <source src= {ArduinoVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <h3 class = "Descript_content">
              <p1>
                I have also developed a prosthetic for hand amputees, that filters electrical signals from EMG electrodes and processes the output using an Arduino to control the claw gripper. I designed components in SolidWorks 3D printed them with the goal of creating a cost-effective solution
              </p1>
          </h3>

          <div className = "EMG_media">
            <p1>
              <video controls muted>
                <source src = '/EMGClawVideo.mp4' type = "video/mp4" height= "500px"/>
                Your browser does not support the video tag.
              </video>
            </p1>
            <p2>
              <img src = {EMGClawCad} height= "500px"/>
            </p2>
          </div>

          <h3 class = "Descript_content" id = "fadein2">
              <p1>
                Here is an example of a script that I wrote using Python, which pulls data from the database of the Government of Ontario, organizing the data, and pushing the data to be displayed here. This script is automated and ran daily, updating the graph when new data is uploaded onto the government database. (Ontario is no longer updating their COVID-19 database).
                
                (click and hover to view data)
              </p1>
          </h3>
 
          <div class="box">
              <div class="crop ratio ratio-1:1 ">
                  <iframe width="100%" height="100%" src="https://docs.google.com/spreadsheets/d/1SZ7rFdmEeR2oQ1xWxmmTTTjW1d4HtQNttZLdltmZNI0/edit#gid=1754425699" frameborder="0" scrolling="no" class="covid_graph"></iframe>
              </div>
          </div>

          <div class="whitestrip">
            <img src={whiteStrip} class="white_strip" height="800px" />
          </div>
          
          <div>
            <button className="scroll-button2" onClick={scrollToNextSectionThree}>
              <img className = "down-button" src={downButton}/>
            </button>
          </div>

          <h3 class="Descript_header" ref={scrollRef3}>
              <p>
                  CAD Projects
              </p>
          </h3>

          <h3 class="Descript_content">
              <p>
                  I have experience in both SolidWorks and Onshape. I strive to create projects that integrate skills from multiple fields, and I especially love getting hands on with CAD and 3D printing. Showcased below is a LEGO minifigure I planned and modelled from scratch in SolidWorks, and it was designed for functionality. Each part is posable as if it is a real LEGO minifigure.
              </p>
          </h3>

          <div class="Image_Display">
              <img src={LegoPosed} alt="Lego Posed" height="40%"/>
              <img src= {LegoExplode} alt="Lego Explode" height="40%"/>
          </div>

          <h3 class="Descript_content">
              <p1>
                Having learned Onshape, I've developed the fundamental skills of working with 3D models, and with Onshape's built-in version management and collaborative tools, I've developed expertise in CAD design.  
              </p1>
          </h3>

          <div class="Image_Display">
              <img src="/OrcaPosed.png" alt="Orca Posed" height="40%"/>
              <img src="/OrcaExplode.png"  alt="Orca Explode" height="40%"/>
          </div>

          <div class="Image_Display_Solo">
              <img src="/OrcaDrawing.png" alt="Orca Drawing" height="40%"/>
          </div>

          <div class="Image_Display">
              <img src="/SkatePosed.png" alt="Skate Posed" height="40%"/>
              <img src="/SkateExplode.png"  alt="Skate Explode" height="40%"/>
          </div>

          <div class="Image_Display_Solo">
              <img src="/SkateDrawing.png" alt="Skate Drawing" height="40%"/>
          </div>

          {/* fix scrollRef3 */}
          <h3 class="Descript_header"> 
              <p>
                  Graphic Design
              </p>
          </h3>

          <h3 class="Descript_content">
              <p>
                As an avid artist, I continually improve my skills in visual communication. I aspire to create design for organizations that allow the user and reader to understand graphics clearly. A number of my designs have already been chosen as logos for design teams and clubs at the University of Waterloo.
              </p>
          </h3>

          <div class="Image_Display">
              <img src="/Orbital1.png" alt="Skate Posed" height="40%"/>
              <img src="/Orbital2.png"  alt="Skate Explode" height="40%"/>
          </div>

          <h3 class="Descript_header"> 
              <p1>
                  Visual Art
              </p1>
          </h3>

          <h3 class="Descript_content">
              <p>
                On my own time, I enjoy drawing on digital platforms, which develops my creativity and visual design skills. All of the art and designs on this website are my personal creation.
              </p>
          </h3>

          <div class="Image_Display">
            <video controls muted>
                  <source src = '/lady video.mp4' type = "video/mp4" height= "500px"/>
                  Your browser does not support the video tag.
            </video>
            <video controls muted>
                  <source src = '/dude video.mp4' type = "video/mp4" height= "500px"/>
                  Your browser does not support the video tag.
            </video>
          </div>

          <div class="Image_Display">
          <video controls muted>
                  <source src = '/asianman video.mp4' type = "video/mp4" height= "500px"/>
                  Your browser does not support the video tag.
            </video>
            <video controls muted>
                  <source src = '/gambino video.mp4' type = "video/mp4" height= "500px"/>
                  Your browser does not support the video tag.
            </video>
          </div>


        </main>
      </div>

       <br/><br/><br/><br/><br/><br/>
      <footer>
        <footerContainer className = "footer">
            <footerContent>
                  <a href = "https://github.com/Ryan-Jing" target="_blank"> 
                    Github
                  </a>

                  <a href = "https://www.linkedin.com/in/ryan-jing-577201216" target="_blank"> 
                    LinkedIn
                  </a>
            </footerContent>
        </footerContainer>
      </footer>
    </>
  )
}

export default App

