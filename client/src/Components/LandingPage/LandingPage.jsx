import React, { useState, useEffect, useRef } from 'react';
import { FaExchangeAlt, FaUserFriends, FaLightbulb, FaQuoteLeft  } from 'react-icons/fa';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    const [scrollPosition, setScrollPosition] = useState(0);
    const heroRef = useRef(null);
    const featuresRef = useRef(null);
    const howItWorksRef = useRef(null);
    const testimonialsRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.pageYOffset);
        };

        const handleParallax = () => {
            if (heroRef.current) {
                const scrolled = window.pageYOffset;
                heroRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
            }

            if (featuresRef.current) {
                const scrolled = window.pageYOffset;
                featuresRef.current.style.transform = `translateY(${scrolled * 0.3}px)`;
            }

            if (howItWorksRef.current) {
                const scrolled = window.pageYOffset;
                howItWorksRef.current.style.transform = `translateY(${scrolled * 0.2}px)`;
            }

            if (testimonialsRef.current) {
                const scrolled = window.pageYOffset;
                testimonialsRef.current.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('scroll', handleParallax);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('scroll', handleParallax);
        };
    }, []);

    const testimonials = [
        {
            name: "Arjun Kumar",
            role: "Data Enthusiast, Certified Data analyst",
            quote: "SkillSwap helped me learn programming while teaching design to a developer. It's an incredible platform!",
            image: "/api/placeholder/80/80"
        },
        {
            name: "Michael R.",
            role: "Software Engineer",
            quote: "I've expanded my skills and network through meaningful skill exchanges.",
            image: "/api/placeholder/80/80"
        },
        {
            name: "Elena K.",
            role: "Marketing Specialist",
            quote: "Such an innovative way to learn and grow professionally!",
            image: "/api/placeholder/80/80"
        }
    ];

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section 
                ref={heroRef}
                className="hero-section animate__animated animate__fadeIn" 
            >
                <div className="hero-content">
                    <h1 className="animate__animated animate__slideInDown">Swap Skills, Expand Horizons</h1>
                    <p className="animate__animated animate__slideInUp">Connect. Learn. Grow. Exchange knowledge seamlessly with professionals worldwide.</p>
                    <div className="hero-cta animate__animated animate__zoomIn">
                        <button 
                            onClick={() => navigate('/register')}
                            className="pulse-hover"
                        >
                            Get Started
                        </button>
                        <button 
                            className="secondary pulse-hover" 
                            onClick={() => navigate('/how-it-works')}
                        >
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section 
                ref={featuresRef}
                className="features-section"
            >
                <h2>Why SkillSwap?</h2>
                <div className="features-grid">
                    {[
                        { 
                            icon: <FaExchangeAlt />, 
                            title: "Skill Exchange", 
                            description: "Directly trade skills with professionals across various domains."
                        },
                        { 
                            icon: <FaUserFriends />, 
                            title: "Networking", 
                            description: "Build meaningful professional connections globally."
                        },
                        { 
                            icon: <FaLightbulb />, 
                            title: "Continuous Learning", 
                            description: "Never stop growing with personalized skill swap opportunities."
                        }
                    ].map((feature, index) => (
                        <div 
                            key={index} 
                            className="feature-card hover-float"
                        >
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works Section */}
            <section 
                ref={howItWorksRef}
                className="how-it-works"
            >
                <h2>How SkillSwap Works</h2>
                <div className="steps-container">
                    {[
                        { number: "1", title: "Create Profile", description: "Set up your profile and showcase your skills." },
                        { number: "2", title: "Find Match", description: "Browse and connect with skill exchange partners." },
                        { number: "3", title: "Learn & Grow", description: "Exchange knowledge through structured sessions." }
                    ].map((step, index) => (
                        <div 
                            key={index} 
                            className="step hover-float"
                        >
                            <div className="step-number">{step.number}</div>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials Section */}
            <section 
                ref={testimonialsRef}
                className="testimonials-section"
            >
                <h2>What Our Users Say</h2>
                <div className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
                        <div 
                            key={index} 
                            className="testimonial-card hover-float"
                        >
                            <FaQuoteLeft className="quote-icon" />
                            <p>"{testimonial.quote}"</p>
                            <div className="testimonial-profile">
                                <img src={testimonial.image} alt={testimonial.name} />
                                <div>
                                    <h4>{testimonial.name}</h4>
                                    <p>{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Rest of the sections remain the same */}
        </div>
    );
};

export default LandingPage;