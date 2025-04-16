import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdTitle } from "react-icons/md";
import { FaAlignLeft, FaVideo, FaTags, FaCoins } from "react-icons/fa";
import './createSwap.css';
import './SwapSkillsLandingPage.css';
import logoImage from '../Assets/logo_skillup.png';

const CreateSwap = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [category, setCategory] = useState('');
  const [skillTags, setSkillTags] = useState([]);
  const [creditCost, setCreditCost] = useState(10); // Default value
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const swapData = {
      title,
      description,
      videoUrl,
      category,
      skillTags,
      creditCost,
    };
    console.log('Swap Data:', swapData);
    alert('Swap created successfully!');
    navigate('/skillSwap');
    // Reset form
    setTitle('');
    setDescription('');
    setVideoUrl('');
    setCategory('');
    setSkillTags([]);
    setCreditCost(10);
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
            <a href="#" className="nav-link" onClick={() => navigate('/skillSwap')}>Return to Home</a>
          </nav>
        </div>
      </header>

      {/* Form Section */}
      <main className="create-swap-container">
        <form className="create-swap-form" onSubmit={handleSubmit}>
          <h1>Create a Skill Swap</h1>

          <div className="input-box">
            <input
              type="text"
              placeholder="Swap Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <MdTitle className="icon" />
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder="Swap Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <FaAlignLeft className="icon" />
          </div>

          <div className="input-box">
            <input
              type="file"
              accept="video/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  const file = e.target.files[0];
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

          <div className="input-box">
            <input
              type="text"
              placeholder="Skill Tags (comma separated)"
              value={skillTags.join(', ')}
              onChange={(e) => setSkillTags(e.target.value.split(',').map(tag => tag.trim()))}
              required
            />
            <FaTags className="icon" />
          </div>

          <div className="input-box">
            <input
              type="number"
              placeholder="Credit Cost"
              value={creditCost}
              onChange={(e) => setCreditCost(Number(e.target.value))}
              required
              min="0"
            />
            <FaCoins className="icon" />
          </div>

          <button type="submit">Create Swap</button>
        </form>
      </main>
    </div>
  );
};

export default CreateSwap;
