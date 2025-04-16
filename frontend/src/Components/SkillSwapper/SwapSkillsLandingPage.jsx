import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import './SwapSkillsLandingPage.css';
import logoImage from '../Assets/logo_skillup.png';


const SwapSkillsLandingPage = () => {
  const [userName] = useState('User01');
  const [greeting, setGreeting] = useState('');
  const navigate = useNavigate();
  const faqRef = useRef(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  const handleCreateSwap = () => {
    navigate('/create-swap');
  };

  const handleJoinSwap = () => {
    alert('Join A Swap button clicked!');
    // Future: navigate or open modal for joining a swap
  };

  const handleJoinNow = () => {
    navigate('/mentored-courses');
  };

  const scrollToFAQ = (e) => {
    e.preventDefault();
    if (faqRef.current) {
      faqRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const contactUsRef = React.useRef(null);

  const scrollToContactUs = (e) => {
    e.preventDefault();
    if (contactUsRef.current) {
      contactUsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-container">
      {/* Navigation Bar */}
      <header className="main-header">
        <div className="skill-header-content">
          {/* Logo */}
          <div className="logo-container">
            <div className="logo-icon" >
              <img src={logoImage} alt="SkillUp Logo" />
            </div>
            <span className="logo-text">SkillUp</span>
          </div>
          
          {/* Navigation Links */}
          <nav className="main-navigation">
            <a href="#" className="nav-link">Home</a>
            <a href="#" className="nav-link">MySkillSwaps</a>
            <a href="#" className="nav-link">My Profile</a>
            <a href="#" className="nav-link" onClick={scrollToContactUs}>ContactUs</a>
            <a href="#" className="nav-link" onClick={scrollToFAQ}>FAQ</a>
          </nav>
        </div>
      </header>
      
      {/* Hero Section */}
      <main className="skill-hero-section">
        <div className="skill-hero-content">
          {/* Left Content */}
          <div className="skill-hero-text-container">
            <h1>
              {greeting} {userName},
            </h1>
            <h2 className="skill-hero-heading">
              <br />
              Welcome to Our <br />
              Skill Swapping<br />
              Platform
            </h2>
            
            <h3 className="skill-hero-subheading">
              Discover a world of opportunities by swapping your skills with others
            </h3>
            
            <div className="skill-hero-buttons">
              <button className="get-started-button" onClick={handleCreateSwap}>Create A Swap</button>
              <button className="explore-skills-button" onClick={handleJoinSwap}>Join A Swap</button>
            </div>
          </div>
          <div className="greeting-image">
            <img src="/avatar1.png" alt="Welcome" />
          </div>
        </div>
        <div className='MentorCourses'>
          <br /> <br /> <br />
          Stay Ahead of the queue? <br />
          Join exclusive batches featuring top industry experts!! 
          <div className="join-now-buttons">
              <button className="join-now-button" onClick={handleJoinNow}>Join Now!!</button>
            </div>
        </div>
        {/* FAQ Section */}
        <section ref={faqRef} className="faq-section">
          <h2>
          Frequently Asked Questions
          </h2>
          <div className="faq-item">
            <h3>What is Skill Swapping?</h3>
            <p>Skill Swapping is a platform where you can exchange your skills with others to learn and grow together.</p>
          </div>
          <div className="faq-item">
            <h3>How do I create a swap?</h3>
            <p>You can create a swap by clicking the "Create A Swap" button and following the instructions.</p>
          </div>
          <div className="faq-item">
            <h3>Is there a fee to join?</h3>
            <p>Basic skill swapping is free, but mentor-led courses require payment. Users can also earn credits by teaching others.</p>
          </div>
          <div className="faq-item">
            <h3>Who can join SkillUp?</h3>
            <p>Anyone interested in learning and sharing skills is welcome to join SkillUp.</p>
          </div>
        </section>
        {/* Contact Us Section */}
        <section ref={contactUsRef} className="contactus-section">
          <h2>
          Contact Us
          </h2>
          <div className="contactus-item">
            <h3>Get in Touch</h3>
            <p>If you have any questions or want to collaborate, feel free to reach out to us at contact@skillup.com or call us at (+91) 9830070661.</p>
          </div>
          <div className="contactus-item">
            <h3>Office Location</h3>
            <p>Heritage Institute of Technology, Kolkata</p>
          </div>
          <div className="contactus-item">
            <h3>Follow Us</h3>
            <p>Stay connected on social media: 
            LinkedIn <a href="https:www.linkedin.com/in/aryan-ghosh-83a26631b" target="_blank" rel="noopener noreferrer"><FaLinkedin style={{ color: 'white' }} /></a> Instagram <a href="https://www.instagram.com/aryanghosh_4960?igsh=YzNzajZsY255anBo" target="_blank" rel="noopener noreferrer"><FaInstagram style={{ color: 'white' }} /></a> Twitter <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter style={{ color: 'white' }} /></a></p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SwapSkillsLandingPage;
