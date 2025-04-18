import React, { useEffect, useRef, useState } from 'react';
import logoImage from '../Assets/logo_skillup.png';
import { useNavigate } from 'react-router-dom';
import './MentorProfile.css';

// ProfileCard component
const ProfileCard = () => {
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    const storedImage = localStorage.getItem('profileImage');

    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem('profileImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="profile-card">
      <h1><b>Mentor Profile</b></h1>

      <div className="avatar-wrapper">
        {profileImage ? (
          <img src={profileImage} alt="Avatar" className="avatar" />
        ) : (
          <div className="avatar-placeholder">No Image</div>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden-input"
        onChange={handleImageChange}
      />

      <button className="change-avatar-btn" onClick={triggerFileInput}>
        Change Avatar
      </button>
    </div>
  );
};

// SkillManager component
const SkillManager = () => {
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState('');

  useEffect(() => {
    const storedSkills = JSON.parse(localStorage.getItem('userSkills'));
    if (storedSkills) {
      setSkills(storedSkills);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userSkills', JSON.stringify(skills));
  }, [skills]);

  const handleAddSkill = () => {
    if (skillInput.trim() !== '') {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleDelete = (index) => {
    const updated = [...skills];
    updated.splice(index, 1);
    setSkills(updated);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingValue(skills[index]);
  };

  const handleSaveEdit = (index) => {
    const updated = [...skills];
    updated[index] = editingValue.trim();
    setSkills(updated);
    setEditingIndex(null);
    setEditingValue('');
  };

  return (
    <div className="skill-manager-container">
      <h2>Manage Your Skills</h2>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter skill"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
        />
        <button onClick={handleAddSkill}>Add Skill</button>
      </div>

      <ul className="skills-list">
        {skills.map((skill, index) => (
          <li key={index} className="skill-item">
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                  className="edit-input"
                />
                <button className="save-btn" onClick={() => handleSaveEdit(index)}>Save</button>
              </>
            ) : (
              <>
                <span className="skill-text">{skill}</span>
                <button className="edit-btn" onClick={() => handleEdit(index)}>Edit</button>
              </>
            )}
            <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// UserBio component
const UserBio = () => {
  const [bio, setBio] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedBio = localStorage.getItem('userBio');
    if (storedBio) {
      setBio(storedBio);
    }
  }, []);

  const handleChange = (e) => {
    setBio(e.target.value);
  };

  const toggleEdit = () => {
    if (isEditing) {
      localStorage.setItem('userBio', bio);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="bio-container">
      <h2>Mentor Bio</h2>
      {isEditing ? (
        <textarea
          value={bio}
          onChange={handleChange}
          className="bio-input"
          rows="5"
        />
      ) : (
        <p className="bio-text">{bio || 'No bio added yet.'}</p>
      )}
      <button className="bio-button" onClick={toggleEdit}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </div>
  );
};

// UserForm component
const calculateAge = (dob) => {
  if (!dob) return '';
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const UserForm = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    dateOfBirth: '',
    role: '',
  });

  const [age, setAge] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('userDetails'));
    if (storedUser) {
      setUser(storedUser);
      setAge(calculateAge(storedUser.dateOfBirth));
    }
  }, []);

  const handleDobChange = (e) => {
    const newDob = e.target.value;
    setUser((prevUser) => ({
      ...prevUser,
      dateOfBirth: newDob,
    }));
    setAge(calculateAge(newDob));

    // Optional: update localStorage if you want persistence
    const updatedUser = { ...user, dateOfBirth: newDob };
    localStorage.setItem('userDetails', JSON.stringify(updatedUser));
  };

  return (
    <div className="user-form-container">
      <h2>Basic Mentor Details</h2>
      <form className="user-form">
        <label>
          Username:
          <input
            type="text"
            value={user.username}
            readOnly
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={user.email}
            readOnly
          />
        </label>

        <label>
          Date of Birth:
          <input
            type="date"
            value={user.dateOfBirth}
            onChange={handleDobChange}
          />
        </label>

        <label>
          Age:
          <input
            type="text"
            value={age}
            readOnly
          />
        </label>

        <label>
          Role:
          <input
            type="text"
            value={user.role}
            readOnly
          />
        </label>
      </form>
    </div>
  );
};

// Main MentorProfile component that combines all sub-components
const MentorProfile = () => {
  const navigate = useNavigate();
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
    <div className="user-profile">
      <ProfileCard />
      <UserForm />
      <UserBio />
      <SkillManager />
      
    </div>
    </div>
  );
};

export default MentorProfile;
