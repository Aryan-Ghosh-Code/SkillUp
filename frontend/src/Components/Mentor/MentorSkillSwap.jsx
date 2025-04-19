import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import './MentorSkillSwap.css';
import logoImage from '../Assets/logo_skillup.png';


const SwapSkillsLandingPage = () => {
  const [userName] = useState('Mentor01');
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

  const handleCreateCourse = () => {
    navigate('/create-courses');
    // Future: navigate or open modal for creating a swap
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
            <Link to="/mentor-skill-swap" className="nav-link">Home</Link>
            <Link to="/my-courses" className="nav-link">My Courses</Link>
            <Link to="/mentor-profile" className="nav-link">My Profile</Link>
            <a href="#" className="nav-link" onClick={scrollToContactUs}>ContactUs</a>
            <a href="#" className="nav-link" onClick={scrollToFAQ}>FAQ</a>
            <Link to="/" className="nav-link">Logout</Link>
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
              Welcome to SkillUp!! <br />
              {/* Skill Swapping<br />
              Platform */}
            </h2>
            
            <h3 className="skill-hero-subheading">
            Ready to Inspire and Transform Lives? <br />
            Teach what you love, inspire others, and turn your expertise into impact—SkillUp empowers you to shape the future, one learner at a time!!
            </h3>
            
            <div className="skill-hero-buttons">
              <button className="get-started-button" onClick={handleCreateCourse}>Create A Course</button>
            </div>
          </div>
          <div className="greeting-image">
            <img src="/avatar1.png" alt="Welcome" />
          </div>
        </div>
        {/* <div className='MentorCourses'>
          <br /> <br /> <br />
          Stay Ahead of the queue? <br />
          Join exclusive batches featuring top industry experts!! 
          <div className="join-now-buttons">
              <button className="join-now-button" onClick={handleJoinNow}>Join Now!!</button>
            </div>
        </div> */}
        {/* FAQ Section */}
        <section ref={faqRef} className="faq-section">
          <h2>
          Frequently Asked Questions
          </h2>
          <div className="faq-item">
            <h3>How do I become a mentor on SkillSwap?</h3>
            <p>Apply as a mentor by submitting your expertise, qualifications, and course details. Our team will review and approve eligible profiles.</p>
          </div>
          <div className="faq-item">
            <h3>What qualifications do I need to be a mentor?</h3>
            <p>You need relevant expertise, certifications (if applicable), and a passion for teaching. We prioritize mentors with proven experience in their field.</p>
          </div>
          <div className="faq-item">
            <h3>How much can I earn as a mentor?</h3>
            <p>You set your course prices, and earnings depend on enrollment numbers. SkillSwap takes a small commission per transaction.</p>
          </div>
          <div className="faq-item">
            <h3>How do I create a course?</h3>
            <p>Use our intuitive course creation tool to upload content, set pricing, and define learning objectives. Our support team can assist if needed.</p>
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
