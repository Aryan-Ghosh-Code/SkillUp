import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserGraduate, FaClock, FaCoins } from "react-icons/fa";
import './MentoredCourses.css';
import './SwapSkillsLandingPage.css';
import logoImage from '../Assets/logo_skillup.png';
import useGetMentorCourses from '../../hooks/useGetMentorCourses';

const ViewCourses = () => {
  const { loading, getMentorCourses } = useGetMentorCourses();
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    const data = await getMentorCourses();
    setCourses(data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  console.log(courses);

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

      {/* Courses Section */}
      <main className="join-swap-container">
        <div className="swap-cards-container">
          {courses.map((course) => (
            <div key={course._id} className="swap-card">
              <h2 className="swap-title">{course.title}</h2>
              <p className="swap-description">{course.description}</p>
              <video className="swap-video" muted>
                <source src={course.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="swap-details">
                <div className="detail-item">
                  <FaUserGraduate className="icon" />
                  <span className="detail-label">Instructor:</span> {course.mentor.name}
                </div>
                <div className="detail-item">
                  <FaCoins className="icon" />
                  <span className="detail-label">Price:</span> {course.price}
                </div>
                <div className="detail-item">
                  <FaClock className="icon" />
                  <span className="detail-label">Created At:</span> {new Date(course.createdAt).toLocaleDateString()}
                </div>
              </div>
              <button
                className="join-button"
                onClick={() => navigate(`/course/${course._id}`)}
              >
                Buy Course
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ViewCourses;
