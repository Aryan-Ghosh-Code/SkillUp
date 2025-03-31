/* correction has been made */
import React from 'react';
import './CourseRecommendations.css';

// Import a default image for better asset management
import defaultCourseImage from '../Assets/logo.png';

const CourseRecommendations = ({ recommendations = [], userSkills = [] }) => {
  return (
    <section className="dashboard-card recommendations-section">
      <div className="card-header">
        <h2>Recommended Courses</h2>
      </div>

      {recommendations && recommendations.length > 0 ? (
        <div className="course-grid">
          {recommendations.map((course) => (
            <div key={course.id || course.title} className="course-card">
              <div className="course-image">
                <img
                  src={course.image ? course.image : defaultCourseImage}
                  alt={course.title || 'Course'}
                  loading="lazy"
                />
              </div>
              <div className="course-content">
                <h3>{course.title || 'Untitled Course'}</h3>
                <p>{course.description || 'No description available.'}</p>
                <div className="course-meta">
                  <span className="duration">{course.duration || 'N/A'}</span>
                  <span className="level">{course.level || 'Beginner'}</span>
                </div>
                <button className="enroll-button">Enroll Now</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-state">No course recommendations available.</p>
      )}
    </section>
  );
};

export default CourseRecommendations;
