import React from 'react';
import logoImage from '../Assets/logo_skillup.png';
import { useNavigate } from 'react-router-dom';
const PaymentSuccess = () => {

	const navigate = useNavigate();
	return (
		<div className="payment">
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
		<h1>Your Payment is Successful!!😊</h1>
		</div>
	)
}

export default PaymentSuccess;