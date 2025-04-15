import React from 'react'
import './MentorSkillSwap.css'
import logo from '../Assets/logo_skillup.png'
const handleViewmycourses = () => {
//   navigate('/mentored-courses');
};
const MentorSkillSwap = () => {
  return (
    <div className="skillswap">
      <div className='navbar'>
        <img src={logo} alt=" " className='logo'/>
        <nav className="main-navigation">
            <a href="#" className="nav-link">Home</a>
            <a href="#" className="nav-link" onClick={handleViewmycourses}>View my courses</a>
        </nav>
      </div>
      <div className="Button1">
        <button className="create-course">Create a Course</button>
      </div>
    </div>
  );
};

export default MentorSkillSwap;