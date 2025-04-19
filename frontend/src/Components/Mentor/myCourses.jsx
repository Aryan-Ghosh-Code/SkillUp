import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './myCourses.css';
import './MentorSkillSwap.css';
import logoImage from '../Assets/logo_skillup.png';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  // Mock data for demonstration - replace with actual API call
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Replace with actual API call
        const mockCourses = [
          {
            id: 1,
            title: 'Web Development Basics',
            description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript.',
            price: 999,
            videoUrl: 'https://example.com/video1.mp4',
            category: 'Web Development',
            thumbnail: 'https://via.placeholder.com/300x200'
          },
          {
            id: 2,
            title: 'Advanced React',
            description: 'Master React with hooks, context, and advanced patterns.',
            price: 1499,
            videoUrl: 'https://example.com/video2.mp4',
            category: 'Frontend Development',
            thumbnail: 'https://via.placeholder.com/300x200'
          }
        ];
        setCourses(mockCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        // Replace with actual API call
        setCourses(courses.filter(course => course.id !== courseId));
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

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
            <a href="#" className="nav-link" onClick={() => navigate('/mentor-skill-swap')}>Return to Home</a>
          </nav>
        </div>
      </header>

      <main className="courses-container">
        <h1 className="courses-title">My Courses</h1>

        {courses.length === 0 ? (
          <div className="no-courses">
            <p>You haven't created any courses yet.</p>
          </div>
        ) : (
          <div className="courses-grid">
            {courses.map((course) => (
              <div key={course.id} className="course-card">
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  className="course-video"
                />
                <h2 className="course-title">{course.title}</h2>
                <p className="course-description">{course.description}</p>
                <div className="course-details">
                  <span className="course-price">₹{course.price}</span>
                  <span className="course-category">{course.category}</span>
                </div>
                <div className="course-actions">
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(course.id)}
                  >
                    Delete Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyCourses;
