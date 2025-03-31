/* correction has been done */
import React, { useState } from "react";
import "./Sidebar.css";
import defaultAvatar from "../Assets/images.jpg"; // Importing from Assets

const Sidebar = ({ userData, completionPercentage }) => {
  // Track active menu item
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <aside className="sidebar">
      {/* Header Section */}
      <div className="sidebar-header">
        <div className="logo">LearningDash</div>
        <div className="user-credits">
          <i className="fas fa-coins"></i>
          <span>{userData?.credits || 0} Credits</span>
        </div>
      </div>

      {/* User Brief Section */}
      <div className="user-brief">
        <img
          src={userData?.profilePicture || defaultAvatar}
          alt={userData?.name || "User"}
          className="sidebar-avatar"
        />
        <div className="user-info">
          <h3>{userData?.name || "User"}</h3>
          <div className="profile-progress">
            <div
              className="progress-bar"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <span>{completionPercentage}% Profile Complete</span>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <nav className="sidebar-nav">
        <ul>
          <li className={activeTab === "dashboard" ? "active" : ""}>
            <a href="#dashboard" onClick={() => setActiveTab("dashboard")}>
              <i className="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <li className={activeTab === "courses" ? "active" : ""}>
            <a href="#courses" onClick={() => setActiveTab("courses")}>
              <i className="fas fa-graduation-cap"></i>
              <span>My Courses</span>
            </a>
          </li>
          <li className={activeTab === "achievements" ? "active" : ""}>
            <a href="#achievements" onClick={() => setActiveTab("achievements")}>
              <i className="fas fa-trophy"></i>
              <span>Achievements</span>
            </a>
          </li>
          <li className={activeTab === "messages" ? "active" : ""}>
            <a href="#messages" onClick={() => setActiveTab("messages")}>
              <i className="fas fa-envelope"></i>
              <span>Messages</span>
            </a>
          </li>
          <li className={activeTab === "settings" ? "active" : ""}>
            <a href="#settings" onClick={() => setActiveTab("settings")}>
              <i className="fas fa-cog"></i>
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* Footer Links */}
      <div className="sidebar-footer">
        <a href="#help">
          <i className="fas fa-question-circle"></i>
          <span>Help & Support</span>
        </a>
        <a href="#logout">
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;