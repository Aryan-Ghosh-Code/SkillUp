import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdTitle } from "react-icons/md";
import { FaAlignLeft, FaRupeeSign , FaVideo, FaTags } from "react-icons/fa";
import './createCourse.css';
import './MentorSkillSwap.css';
import logoImage from '../Assets/logo_skillup.png';

const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for form submission logic
    const courseData = {
      title,
      description,
      price: Number(price),
      videoUrl,
      category,
    };
    console.log('Course Data:', courseData);
    alert('Course submitted successfully!');
    navigate('/mentor-skill-swap');
    // Reset form or navigate as needed
    setTitle('');
    setDescription('');
    setPrice('');
    setVideoUrl('');
    setCategory('');
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

      {/* Form Section */}
      <main className="create-course-container">
        <form className="create-course-form" onSubmit={handleSubmit}>
          <h1>Create a Course</h1>

          <div className="input-box">
            <input
              type="text"
              placeholder="Course Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <MdTitle className="icon" />
          </div>

          <div className="input-box">
            <input
            type="text"
              placeholder="Course Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              // rows={4}
            />
            <FaAlignLeft className="icon" />
          </div>

          <div className="input-box">
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="0"
              step="0.01"
            />
            <FaRupeeSign  className="icon" />
          </div>

          <div className="input-box">
            <input
              type="file"
              accept="video/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  const file = e.target.files[0];
                  // For now, just store the file name or handle file upload here
                  setVideoUrl(file.name);
                }
              }}
              required
            />
  <FaVideo className="icon" />
  <span className="file-upload-text">{videoUrl ? 'Video uploaded' : 'Upload a video'}</span>
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
            <FaTags className="icon" />
          </div>

          <button type="submit">Upload Course</button>
        </form>
      </main>
    </div>
  );
};

export default CreateCourse;
