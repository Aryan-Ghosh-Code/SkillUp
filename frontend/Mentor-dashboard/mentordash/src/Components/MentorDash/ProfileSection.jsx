/* correction has been done */
import React, { useState, useRef } from 'react';
import './ProfileSection.css';

const ProfileSection = ({ userData, onUpdate, completionPercentage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
    bio: userData?.bio || '',
    profilePicture: userData?.profilePicture || ''
  });
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({
          ...formData,
          profilePicture: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
  };

  return (
    <section className="dashboard-card profile-section">
      <div className="card-header">
        <h2>Profile</h2>
        <button 
          className="edit-button" 
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>Profile Picture</label>
            <div className="profile-picture-edit">
              <img 
                src={formData.profilePicture || '/default-avatar.png'} 
                alt="Profile preview" 
                className="profile-image"
              />
              <button 
                type="button" 
                onClick={() => fileInputRef.current.click()}
                className="upload-button"
              >
                Change Photo
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                style={{ display: 'none' }} 
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <button type="submit" className="save-button">Save Changes</button>
        </form>
      ) : (
        <div className="profile-content">
          <div className="profile-info">
            <img 
              src={userData?.profilePicture || '/default-avatar.png'} 
              alt={userData?.name || 'User profile'} 
              className="profile-image"
            />
            <div className="profile-details">
              <h3>{userData?.name || 'User Name'}</h3>
              <p className="email">{userData?.email || 'email@example.com'}</p>
              <p className="bio">{userData?.bio || 'No bio provided yet.'}</p>
            </div>
          </div>

          <div className="profile-completion">
            <h4>Profile Completion</h4>
            <div className="progress-container">
              <div 
                className="progress-bar" 
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <p>{completionPercentage}% Complete</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProfileSection;
