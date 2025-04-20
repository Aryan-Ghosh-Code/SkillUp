import React, { useEffect, useState } from 'react';
import './viewMySwaps.css';
import { FaUserGraduate, FaCoins, FaClock } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import useHandlePay from '../../hooks/useHandlePay';
import useGetCourseById from '../../hooks/getCourseById';

const CourseCard = () => {
    const [course, setCourse] = useState({});
    const { id } = useParams();
    const { payLoading, handlePay } = useHandlePay();
    const { loading, getCourse } = useGetCourseById();

    const handlePayInit = async () => {
        const response = await handlePay(course._id);

        if (response.url) {
            window.location.href = response.url;
        }
    };

    const fetchCourse = async () => {
        const data = await getCourse(id);
        setCourse(data);
    }

    useEffect(() => {
        fetchCourse();
    }, [])

    return (
        <div className="course-card">
            <h2 className="course-title">{course.title}</h2>
            <p className="course-description">{course.description}</p>

            {course.videoUrl && (
                <video className="course-video" muted>
                    <source src={course.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}

            <div className="course-details">
                <div className="detail-item">
                    <FaUserGraduate className="icon" />
                    <span><strong>Instructor:</strong> {course.mentor?.name || 'N/A'}</span>
                </div>
                <div className="detail-item">
                    <FaCoins className="icon" />
                    <span><strong>Price:</strong> ₹{course.price}</span>
                </div>
                <div className="detail-item">
                    <FaClock className="icon" />
                    <span><strong>Created:</strong> {new Date(course.createdAt).toLocaleDateString()}</span>
                </div>
            </div>

            <button
                className="action-button"
                onClick={() => handlePayInit()}
                disabled={loading || payLoading}
            >
                {payLoading ? "Redirecting to Strip..." : "Continue with Stripe"}
            </button>
        </div>
    );
};

export default CourseCard;
