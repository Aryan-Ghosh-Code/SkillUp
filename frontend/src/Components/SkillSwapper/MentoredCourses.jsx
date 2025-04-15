import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MentoredCourses.css';
import './SwapSkillsLandingPage.css';
import logoImage from '../Assets/logo_skillup.png';

// Simulated mentor data for display purposes
const mentors = {
  'mentor1': { name: 'John Doe' },
  'mentor2': { name: 'Jane Smith' },
  'mentor3': { name: 'Alice Johnson' }
};

const MentoredCourses = () => {
  // Updated course data to match database schema
  const dataScienceCourses = [
    {
      id: 1,
      title: 'Data Science With Generative AI Course',
      description: 'Job Assistance | Ticket to career growth in Data Science',
      price: 299,
      mentor: 'mentor1',
      videoUrl: 'https://example.com/video1',
      enrolledUsers: ['user1', 'user2', 'user3'],
      category: 'Data Science',
      ratings: [{ user: 'user1', rating: 4 }, { user: 'user2', rating: 5 }],
      createdAt: '2023-01-15'
    },
    {
      id: 2,
      title: 'Data Analytics Course',
      description: 'Job Assistance | Gain Data Analytics Expertise',
      price: 199,
      mentor: 'mentor2',
      videoUrl: 'https://example.com/video2',
      enrolledUsers: ['user3'],
      category: 'Analytics',
      ratings: [{ user: 'user3', rating: 3 }],
      createdAt: '2023-02-10'
    },
    {
      id: 3,
      title: 'Data Analytics Course - Hinglish',
      description: 'Job Assistance | Gain Data Analytics Expertise',
      price: 149,
      mentor: 'mentor3',
      videoUrl: 'https://example.com/video3',
      enrolledUsers: [],
      category: 'Analytics',
      ratings: [],
      createdAt: '2023-03-05'
    }
  ];

  const bankingFinanceCourses = [
    {
      id: 4,
      title: 'Finance, Tax and Accounting Course',
      description: 'Master finance with PWC expert-led training.',
      price: 349,
      mentor: 'mentor1',
      videoUrl: '',
      enrolledUsers: ['user1', 'user4'],
      category: 'Finance',
      ratings: [{ user: 'user4', rating: 5 }],
      createdAt: '2023-01-20'
    },
    {
      id: 5,
      title: 'Financial Modeling Course with Deloitte Learning Academy',
      description: 'Industry-Relevant Financial Modeling Certification',
      price: 399,
      mentor: 'mentor2',
      videoUrl: 'https://example.com/video5',
      enrolledUsers: ['user2', 'user5', 'user6'],
      category: 'Financial Modeling',
      ratings: [{ user: 'user5', rating: 4 }, { user: 'user6', rating: 4 }],
      createdAt: '2023-02-25'
    },
    {
      id: 6,
      title: 'Post Graduate Certification in Banking, Financial Services & Insurance',
      description: 'Program for individuals who wish to kickstart their career in the Private Banking Industry.',
      price: 499,
      mentor: 'mentor3',
      videoUrl: '',
      enrolledUsers: ['user7'],
      category: 'Banking',
      ratings: [{ user: 'user7', rating: 5 }],
      createdAt: '2023-03-15'
    }
  ];

  // Helper function to calculate average rating
  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 'No ratings';
    const total = ratings.reduce((sum, r) => sum + r.rating, 0);
    return (total / ratings.length).toFixed(1);
  };

  // Course Card Component
  const CourseCard = ({ course }) => {
    const { title, description, price, mentor, videoUrl, enrolledUsers, category, ratings, createdAt } = course;
    const mentorName = mentors[mentor] ? mentors[mentor].name : 'Unknown Mentor';
    const averageRating = calculateAverageRating(ratings);
    const enrolledCount = enrolledUsers ? enrolledUsers.length : 0;

    return (
      <div className="course-card">
        <div className="card-image-container">
          {/* Placeholder image or category-based image */}
          <img className="card-image" src={`https://via.placeholder.com/300x160?text=${encodeURIComponent(category)}`} alt={title} />
        </div>
        
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          <p className="card-description">{description}</p>
          <p className="card-price">Price: ${price}</p>
          <p className="card-mentor">Mentor: {mentorName}</p>
          <p className="card-category">Category: {category}</p>
          <p className="card-rating">Average Rating: {averageRating}</p>
          <p className="card-enrolled">{enrolledCount} enrolled</p>
          <p className="card-created">Created on: {new Date(createdAt).toLocaleDateString()}</p>
          {videoUrl && (
            <div className="card-video">
              <a href={videoUrl} target="_blank" rel="noopener noreferrer">Demo Video</a>
            </div>
          )}
          <div className="card-actions">
            <button className="btn-explore">Explore</button>
            <button className="btn-buy">Buy Now</button>
          </div>
        </div>
      </div>
    );
  };

  // Course Section Component
  const CourseSection = ({ title, courses }) => {
    const [startIndex, setStartIndex] = useState(0);
    const visibleCourses = 3;

    const handlePrevious = () => {
      setStartIndex(Math.max(0, startIndex - 1));
    };

    const handleNext = () => {
      setStartIndex(Math.min(courses.length - visibleCourses, startIndex + 1));
    };

    return (
      <div className="course-section">
        <div className="section-header">
          <h2>{title}</h2>
          <div className="view-all">
            View All <span className="arrow-icon">→</span>
          </div>
        </div>
        
        <div className="courses-container">
          {courses.slice(startIndex, startIndex + visibleCourses).map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        
        <div className="navigation-controls">
          <button 
            className="nav-button" 
            onClick={handlePrevious}
            disabled={startIndex === 0}
          >
          </button>
          <button 
            className="nav-button" 
            onClick={handleNext}
            disabled={startIndex >= courses.length - visibleCourses}
          >
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
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
            <Link to="/skillSwap" className="nav-link">Return to Home</Link>
          </nav>
        </div>
      </header>
      <div className="app-container">
        <CourseSection 
          title="Data Science & Analytics" 
          courses={dataScienceCourses} 
        />
        <CourseSection 
          title="Banking & Finance" 
          courses={bankingFinanceCourses} 
        />
      </div>
    </div>
  );
};

export default MentoredCourses;
