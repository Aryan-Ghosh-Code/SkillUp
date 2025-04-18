import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdTitle } from "react-icons/md";
import { FaAlignLeft, FaVideo, FaTags, FaCoins } from "react-icons/fa";
import './createSwap.css';
import './SwapSkillsLandingPage.css';
import logoImage from '../Assets/logo_skillup.png';
import { uploadVideoToCloudinary } from '../../utils/uploadVideoToCloudinary';
import useCreateSkillSwap from '../../hooks/useCreateSkillSwap';

const CreateSwap = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videoBlobUrl, setVideoBlobUrl] = useState(null);
  const [category, setCategory] = useState('');
  const [skillTags, setSkillTags] = useState([]);
  const [creditCost, setCreditCost] = useState(10);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const {loading, createSkillSwap} = useCreateSkillSwap();

  const handleChoose = () => {
    inputRef.current?.click();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('video/')) {
      setError('Please select a valid video file.');
      return;
    }
    setVideoFile(file);
    setVideoBlobUrl(URL.createObjectURL(file));
    setError(null);
  };

  const uploadVideo = async () => {
    if (!videoFile) {
      setError('Please choose a video before submitting.');
      return false;
    }
    setIsUploading(true);
    setError(null);
    try {
      const uploadedUrl = await uploadVideoToCloudinary(videoFile);
      if (!uploadedUrl) throw new Error("Video upload failed.");
      setVideoUrl(uploadedUrl);
      return uploadedUrl;
    } catch (err) {
      setError(err.message || "Upload failed. Please try again.");
      return false;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !category || skillTags.length === 0) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!videoFile) {
      setError('Please choose a video before submitting.');
      return;
    }
    const uploadedUrl = await uploadVideo();
    if (!uploadedUrl) return;

    const swapData = {
      title,
      description,
      videoUrl: uploadedUrl,
      category,
      skillTags,
      creditCost
    };
    
    await createSkillSwap(swapData);

    setTitle('');
    setDescription('');
    setCategory('');
    setSkillTags([]);
    setCreditCost(10);
    setVideoFile(null);
    setVideoBlobUrl(null);
    setVideoUrl('');
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
              onChange={e => setTitle(e.target.value)}
              required
            />
            <MdTitle className="icon" />
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder="Swap Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
            <FaAlignLeft className="icon" />
          </div>

          <div className="input-box">
            <input
              ref={inputRef}
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              required
            />
            <span className="file-upload-text">
              {videoBlobUrl ? videoFile.name : 'Upload a video'}
            </span>
            <FaVideo className="icon" />
          </div>

          {videoBlobUrl && (
            <div className="input-box" style={{ height: 'auto' }}>
              <video width="100%" height="200" controls src={videoBlobUrl}></video>
              <p className="file-upload-text">{videoFile.name}</p>
            </div>
          )}

          <div className="input-box">
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              required
            >
              <option value="">Select a Category</option>
              <option>Technology</option>
              <option>Art</option>
              <option>Music</option>
              <option>Cooking</option>
              <option>Language</option>
              <option>Sports</option>
              <option>Other</option>
            </select>
            <FaTags className="icon" />
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder="Skill Tags (comma separated)"
              value={skillTags.join(', ')}
              onChange={e => setSkillTags(e.target.value.split(',').map(t => t.trim()).filter(t => t))}
              required
            />
            <FaTags className="icon" />
          </div>

          <div className="input-box">
            <input
              type="number"
              placeholder="Credit Cost"
              value={creditCost}
              onChange={e => setCreditCost(Number(e.target.value))}
              min="0"
              required
            />
            <FaCoins className="icon" />
          </div>

          {error && <div className="file-upload-text" style={{ color: 'red', margin: '8px 0' }}>{error}</div>}

          <button type="submit" disabled={isUploading || loading} className={isUploading ? 'uploading' : ''}>
            {isUploading || loading ? 'Uploading...' : 'Create Swap'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateSwap;
