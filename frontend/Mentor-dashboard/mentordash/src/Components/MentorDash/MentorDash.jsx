/* correction has been done */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import ProfileSection from './ProfileSection';
import ActivitySections from './ActivitySections';
import SkillsSection from './SkillsSection';
import CourseRecommendations from './CourseRecommendations';
import Notifications from './Notifications';
import './MentorDash.css';

const MentorDash = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const parallaxRef = useRef(null);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollY = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/user/profile');
        setUserData(response.data);
        setUnreadNotifications(response.data.notifications.filter(notif => !notif.read).length);
        setLoading(false);
      } catch (err) {
        setError('Failed to load user data');
        setLoading(false);
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, []);

  // Mark notifications as read
  const markNotificationsAsRead = () => {
    if (userData) {
      const updatedNotifications = userData.notifications.map(notif => ({ ...notif, read: true }));
      setUserData(prevData => ({ ...prevData, notifications: updatedNotifications }));
      setUnreadNotifications(0);
    }
  };

  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    if (!userData) return 0;

    const requiredFields = ['name', 'email', 'bio', 'profilePicture', 'skills'];
    let filledFields = requiredFields.filter(field =>
      field === 'skills' ? userData.skills?.length > 0 : Boolean(userData[field])
    ).length;

    return Math.round((filledFields / requiredFields.length) * 100);
  };

  // Update user profile
  const handleProfileUpdate = async (updatedData) => {
    try {
      setLoading(true);
      const response = await axios.put('/api/user/profile', updatedData);
      setUserData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to update profile');
      setLoading(false);
      console.error('Error updating profile:', err);
    }
  };

  if (loading) {
    return <div className="loading-container">Loading your dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      <Sidebar userData={userData} completionPercentage={calculateProfileCompletion()} />

      <main className="dashboard-content">
        <div className="parallax-bg" ref={parallaxRef}></div>

        <div className="dashboard-header">
          <h1>Welcome, {userData?.name || 'User'}!</h1>
          <Notifications notifications={userData?.notifications || []} onOpen={markNotificationsAsRead} unreadCount={unreadNotifications} />
        </div>

        <div className="dashboard-grid">
          <ProfileSection userData={userData} onUpdate={handleProfileUpdate} completionPercentage={calculateProfileCompletion()} />
          <ActivitySections activities={userData?.recentActivities || []} />
          <SkillsSection skills={userData?.skills || []} onUpdate={(skills) => handleProfileUpdate({ ...userData, skills })} />
          <CourseRecommendations recommendations={userData?.courseRecommendations || []} userSkills={userData?.skills || []} />
        </div>
      </main>
    </div>
  );
};

export default MentorDash;