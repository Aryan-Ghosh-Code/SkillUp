// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MdTitle } from "react-icons/md";
// import { FaAlignLeft, FaRupeeSign , FaVideo, FaTags } from "react-icons/fa";
// import './createCourse.css';
// import './MentorSkillSwap.css';
// import logoImage from '../Assets/logo_skillup.png';

// const CreateCourse = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const [videoUrl, setVideoUrl] = useState('');
//   const [category, setCategory] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Placeholder for form submission logic
//     const courseData = {
//       title,
//       description,
//       price: Number(price),
//       videoUrl,
//       category,
//     };
//     console.log('Course Data:', courseData);
//     alert('Course submitted successfully!');
//     navigate('/mentor-skill-swap');
//     // Reset form or navigate as needed
//     setTitle('');
//     setDescription('');
//     setPrice('');
//     setVideoUrl('');
//     setCategory('');
//   };

//   return (
//     <div>
//       {/* Static Navbar */}
//       <header className="main-header">
//         <div className="skill-header-content">
//           <div className="logo-container">
//             <div className="logo-icon">
//               <img src={logoImage} alt="SkillUp Logo" />
//             </div>
//             <span className="logo-text">SkillUp</span>
//           </div>
//           <nav className="main-navigation">
//             <a href="#" className="nav-link" onClick={() => navigate('/mentor-skill-swap')}>Return to Home</a>
//           </nav>
//         </div>
//       </header>

//       {/* Form Section */}
//       <main className="create-course-container">
//         <form className="create-course-form" onSubmit={handleSubmit}>
//           <h1>Create a Course</h1>

//           <div className="input-box">
//             <input
//               type="text"
//               placeholder="Course Title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//             <MdTitle className="icon" />
//           </div>

//           <div className="input-box">
//             <input
//             type="text"
//               placeholder="Course Description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//               // rows={4}
//             />
//             <FaAlignLeft className="icon" />
//           </div>

//           <div className="input-box">
//             <input
//               type="number"
//               placeholder="Price"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               required
//               min="0"
//               step="0.01"
//             />
//             <FaRupeeSign  className="icon" />
//           </div>

//           <div className="input-box">
//             <input
//               type="file"
//               accept="video/*"
//               onChange={(e) => {
//                 if (e.target.files && e.target.files.length > 0) {
//                   const file = e.target.files[0];
//                   // For now, just store the file name or handle file upload here
//                   setVideoUrl(file.name);
//                 }
//               }}
//               required
//             />
//   <FaVideo className="icon" />
//   <span className="file-upload-text">{videoUrl ? 'Video uploaded' : 'Upload a video'}</span>
//           </div>

//           <div className="input-box">
//             <input
//               type="text"
//               placeholder="Category"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               required
//             />
//             <FaTags className="icon" />
//           </div>

//           <button type="submit">Upload Course</button>
//         </form>
//       </main>
//     </div>
//   );
// };

// export default CreateCourse;

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdTitle } from "react-icons/md";
import { FaAlignLeft, FaRupeeSign , FaVideo, FaTags } from "react-icons/fa";
import './createCourse.css';
import './MentorSkillSwap.css';
import logoImage from '../Assets/logo_skillup.png';
import { uploadVideoToCloudinary } from '../../utils/uploadVideoToCloudinary';
import useCreateCourse from '../../hooks/useCreateCourse';

const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videoBlobUrl, setVideoBlobUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [category, setCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const {loading, createCourse} = useCreateCourse();
 
  const inputRef = useRef(null);
  const navigate = useNavigate();

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
    if (!title || !description || !category || !price || !videoFile) {
      setError('Please fill in all required fields.');
      return;
    }

    const uploadedUrl = await uploadVideo();
    if (!uploadedUrl) return;

    const courseData = {
      title,
      description,
      price: Number(price),
      videoUrl: uploadedUrl,
      category,
    };

    await createCourse(courseData);
    // console.log('Course Data:', courseData);
    // alert('Course submitted successfully!');
    navigate('/mentor-skill-swap');

    // Reset form
    setTitle('');
    setDescription('');
    setPrice('');
    setCategory('');
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
            <FaRupeeSign className="icon" />
          </div>

          <div className="input-box">
            <input
              ref={inputRef}
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              required
            />
            <FaVideo className="icon" />
            <span className="file-upload-text">
              {videoBlobUrl ? videoFile.name : 'Upload a video'}
            </span>
          </div>

          {videoBlobUrl && (
            <div className="input-box" style={{ height: 'auto' }}>
              <video width="100%" height="200" controls src={videoBlobUrl}></video>
              <p className="file-upload-text">{videoFile.name}</p>
            </div>
          )}

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

          {error && <div className="file-upload-text" style={{ color: 'red', margin: '8px 0' }}>{error}</div>}

          <button type="submit" disabled={isUploading} className={isUploading ? 'uploading' : ''}>
            {isUploading ? 'Uploading...' : 'Upload Course'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateCourse;
