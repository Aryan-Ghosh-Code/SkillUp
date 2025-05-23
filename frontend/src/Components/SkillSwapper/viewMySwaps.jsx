import React, { useEffect, useState } from 'react';
import { FaTags, FaCoins, FaUser, FaClock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './viewMySwaps.css';
import logoImage from '../Assets/logo_skillup.png';
import useGetMySkillSwapSessions from '../../hooks/useGetMySkillSwapsSessions';
import useGetMyPurchasedCourse from '../../hooks/useGetMyPurchasedCourse';

const ViewMySwaps = () => {
  const { loading, getMySkillSwap } = useGetMySkillSwapSessions();
  const { loading:downloading, getMyCourse } = useGetMyPurchasedCourse();
  const [skillSwaps, setSkillSwaps] = useState([]);
  const [mentorCourses, setMentorCourses] = useState([]);
  const navigate = useNavigate();

  const getSkillSwapSessions = async () => {
    const data = await getMySkillSwap();
    setSkillSwaps(data);
  }

  const getMentoredCourses = async () => {
    const data = await getMyCourse();
    setMentorCourses(data);
  }

  useEffect(() => {
    getSkillSwapSessions();
    getMentoredCourses();
  }, []);

  return (
    <div>
      {/* Static Navbar */}
      <header className="main-header">
        <div className="skill-header-content">
          <div className="logo-container">
            <div className="logo-icon">
              <img src={logoImage} alt="SkillUp Logo" />
            </div>
            <span className="logo-text">SkillUp</span>
          </div>
          <nav className="main-navigation">
            <a href="#" className="nav-link" onClick={() => navigate('/skillSwap')}>Return to Home</a>
          </nav>
        </div>
      </header>

      {/* Skillswap Enrollments Section */}
      <main className="view-my-swaps-container">
        <h2>Your Skillswap Enrollments</h2>
        <div className="swap-cards-container">
          {skillSwaps.map((swapSession) => (
            <div key={swapSession.id} className="swap-card">
              <h2 className="swap-title">{swapSession.title}</h2>
              <p className="swap-description">{swapSession.description}</p>
              <video className="swap-video" controls muted>
                <source src={swapSession.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="swap-details">
                <div className="detail-item">
                  <FaTags className="icon" />
                  <span className="detail-label">Category:</span> {swapSession.category}
                </div>
                <div className="detail-item">
                  <FaTags className="icon" />
                  <span className="detail-label">Skill Tags:</span> {swapSession.skillTags.join(', ')}
                </div>
                <div className="detail-item">
                  <FaUser className="icon" />
                  <span className="detail-label">Offered By:</span> {swapSession.offeredBy.name}
                </div>
                <div className="detail-item">
                  <FaCoins className="icon" />
                  <span className="detail-label">Credit Cost:</span> {swapSession.creditCost}
                </div>
                <div className="detail-item">
                <FaClock className="icon" />
                  <span className="detail-label">Created At:</span> {new Date(swapSession.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mentored Courses Section */}
        <h2>Your Mentored Courses</h2>
        <div className="course-cards-container">
          {mentorCourses.map((course) => (
            <div key={course.id} className="course-card">
              <h3 className="card-title">{course.title}</h3>
              <p className="card-description">{course.description}</p>
              <p className="card-price"><FaCoins className="icon" />Price: ₹{course.price}</p>
              <p className="card-mentor"><FaUser className="icon" />Mentor: {course.mentor.name}</p>
              <p className="card-created"><FaClock className="icon" />Created on: {new Date(course.createdAt).toLocaleDateString()}</p>
              {course.videoUrl && (
                <div className="card-video">
                  <a href={course.videoUrl} target="_blank" rel="noopener noreferrer">Find your Lecture</a>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ViewMySwaps;
