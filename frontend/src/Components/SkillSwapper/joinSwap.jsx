import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTags, FaCoins, FaUser } from "react-icons/fa";
import './joinSwap.css';
import logoImage from '../Assets/logo_skillup.png';

// Simulated swap session data for display purposes
const swapSessions = [
  {
    id: 1,
    title: "Learn React Hooks",
    description: "A session to learn React hooks in depth.",
    videoUrl: "https://example.com/video/react-hooks.mp4",
    category: "Web Development",
    skillTags: ["React", "JavaScript", "Hooks"],
    offeredBy: { name: "John Doe" },
    creditCost: 15,
    createdAt: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    title: "Advanced JavaScript Concepts",
    description: "Deep dive into JavaScript ES6+ features.",
    videoUrl: "https://example.com/video/advanced-js.mp4",
    category: "Web Development",
    skillTags: ["JavaScript", "ES6", "Programming"],
    offeredBy: { name: "Jane Smith" },
    creditCost: 20,
    createdAt: "2024-01-20T10:00:00Z"
  },
  {
    id: 3,
    title: "Introduction to Node.js",
    description: "Learn the basics of Node.js and server-side JavaScript.",
    videoUrl: "https://example.com/video/nodejs-intro.mp4",
    category: "Web Development",
    skillTags: ["Node.js", "JavaScript", "Backend"],
    offeredBy: { name: "Alice Johnson" },
    creditCost: 25,
    createdAt: "2024-01-25T10:00:00Z"
  },
  {
    id: 4,
    title: "Understanding TypeScript",
    description: "A comprehensive guide to TypeScript for JavaScript developers.",
    videoUrl: "https://example.com/video/typescript.mp4",
    category: "Web Development",
    skillTags: ["TypeScript", "JavaScript"],
    offeredBy: { name: "Michael Brown" },
    creditCost: 30,
    createdAt: "2024-02-01T10:00:00Z"
  },
  {
    id: 5,
    title: "Building REST APIs with Express",
    description: "Learn how to build RESTful APIs using Express.js.",
    videoUrl: "https://example.com/video/express-api.mp4",
    category: "Web Development",
    skillTags: ["Express", "Node.js", "APIs"],
    offeredBy: { name: "Emily Davis" },
    creditCost: 35,
    createdAt: "2024-02-05T10:00:00Z"
  },
  {
    id: 6,
    title: "Mastering CSS Flexbox",
    description: "A deep dive into CSS Flexbox for responsive layouts.",
    videoUrl: "https://example.com/video/flexbox.mp4",
    category: "Web Design",
    skillTags: ["CSS", "Flexbox", "Web Design"],
    offeredBy: { name: "Sarah Wilson" },
    creditCost: 10,
    createdAt: "2024-02-10T10:00:00Z"
  }
];

const JoinSwap = () => {
  const navigate = useNavigate();

  const handleJoin = (swap) => {
    alert(`You have joined the swap: ${swap.title}`);
    // Implement join logic here
    navigate('/skillSwap');
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

      {/* Swap Details Section */}
      <main className="join-swap-container">
        <div className="swap-cards-container">
          {swapSessions.map((swapSession) => (
            <div key={swapSession.id} className="swap-card">
              <h2 className="swap-title">{swapSession.title}</h2>
              <p className="swap-description">{swapSession.description}</p>
              <video className="swap-video" controls>
                <source src={swapSession.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="swap-details">
                <div className="detail-item">
                  <FaTags className="icon" />
                  <span className="detail-label">Category:</span> {swapSession.category}
                </div>
                <div className="detail-item">
                  <FaTags className="icon" />
                  <span className="detail-label">Skill Tags:</span> {swapSession.skillTags.join(', ')}
                </div>
                <div className="detail-item">
                  <FaUser className="icon" />
                  <span className="detail-label">Offered By:</span> {swapSession.offeredBy.name}
                </div>
                <div className="detail-item">
                  <FaCoins className="icon" />
                  <span className="detail-label">Credit Cost:</span> {swapSession.creditCost}
                </div>
                <div className="detail-item">
                  <span className="detail-label">Created At:</span> {new Date(swapSession.createdAt).toLocaleDateString()}
                </div>
              </div>
              <button className="join-button" onClick={() => handleJoin(swapSession)}>Join Swap</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default JoinSwap;
