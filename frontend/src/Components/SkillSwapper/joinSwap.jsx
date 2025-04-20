import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTags, FaCoins, FaUser } from "react-icons/fa";
import './joinSwap.css';
import logoImage from '../Assets/logo_skillup.png';
import useGetSkillSwapSessions from '../../hooks/useGetSkillSwapSessions';
import useJoinSkillSwapSessions from '../../hooks/useJoinSkillSwapSession';

const JoinSwap = () => {
  const { loading, getSkillSwap } = useGetSkillSwapSessions();
  const { loading: joining, enroll } = useJoinSkillSwapSessions();
  const [skillSwaps, setSkillSwaps] = useState([]);
  const navigate = useNavigate();

  const getSkillSwapSessions = async () => {
    const data = await getSkillSwap();
    setSkillSwaps(data);
  }

  useEffect(() => {
    getSkillSwapSessions();
  }, []);

  const handleJoin = async (id) => {
    const data = await enroll(id);
    if(data) {
      navigate('/view-swap');
    }
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
          {skillSwaps.map((swapSession) => (
            <div key={swapSession.id} className="swap-card">
              <h2 className="swap-title">{swapSession.title}</h2>
              <p className="swap-description">{swapSession.description}</p>
              <video className="swap-video" muted>
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
              <button className="join-button" onClick={() => handleJoin(swapSession._id)}>Join Swap</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default JoinSwap;
