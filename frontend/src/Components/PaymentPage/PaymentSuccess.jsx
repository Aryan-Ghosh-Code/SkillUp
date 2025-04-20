import React, { useEffect, useState } from 'react';
import logoImage from '../Assets/logo_skillup.png';
import { useLocation, useNavigate } from 'react-router-dom';
import useEnrollCourse from '../../hooks/useEnrollCourse';
import "./PaymentSuccess.css"

const PaymentSuccess = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [courseId, setCourseId] = useState("");
	const [course, setCourse] = useState();
	const { loading, enroll } = useEnrollCourse();

	const getCourseId = () => {
		const queryParams = new URLSearchParams(location.search);
		const course_id = queryParams.get("courseId");
		setCourseId(course_id);
	}

	const handleConfirm = async () => {
		const data = await enroll(courseId);
		setCourse(data);
	}

	useEffect(() => {
		getCourseId();
	}, [location.search, courseId]);

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
						<a href="#" className="nav-link" onClick={() => navigate('/skillSwap')}>Return to Home</a>
					</nav>
				</div>
			</header>

			{course ? (
				<div className="payment-container">
					<h1>Enrollment Successful😊</h1>
					<h3>{course.title}</h3>
					<h3>{course.category}</h3>
					<h3>₹{course.price}</h3>
				</div>
			) : (
				<div className="payment-container">
					<h1>Your Payment is Successful!!😊</h1>
					<h3>Just one Step behind...</h3>

					<button
						className='edit-btn'
						disabled={loading}
						onClick={() => handleConfirm()}
					>
						{loading ? "Confirming your purchase..." : "Confirm Order"}
					</button>
				</div>
			)}
		</div>
	)
}

export default PaymentSuccess;