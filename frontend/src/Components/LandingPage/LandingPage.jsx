import React, { useState, useEffect, useRef } from 'react';
import { FaQuoteLeft  } from 'react-icons/fa';
import { Link,  animateScroll as scroll, scroller} from 'react-scroll';
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
                heroRef.current.style.transform = `translateY(${scrolled * 0.3}px)`; // Slower for hero
            }

            if (featuresRef.current) {
                const scrolled = window.pageYOffset;
                featuresRef.current.style.transform = `translateY(${scrolled * 0.4}px)`; // Faster for features
            }

            if (howItWorksRef.current) {
                const scrolled = window.pageYOffset;
                howItWorksRef.current.style.transform = `translateY(${scrolled * 0.5}px)`; // Medium speed for how it works
            }

            if (testimonialsRef.current) {
                const scrolled = window.pageYOffset;
                testimonialsRef.current.style.transform = `translateY(${scrolled * 0.6}px)`; // Fastest for testimonials
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('scroll', handleParallax);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('scroll', handleParallax);
        };
    }, []);

    const handleLearnMoreClick = () => {
        // Scroll to the "How SkillUp Works" section
        scroller.scrollTo('Features', {
            smooth: 'true',
            duration: 5,
        });
    };

    const testimonials = [
        {
            name: "Arjun Kumar",
            role: "Certified Data analyst",
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
        },
        {
            name: "Sophia W.",
            role: "UX Designer",
            quote: "SkillSwap has transformed the way I learn and collaborate with others. The platform is amazing!",
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
                            onClick={() => navigate('/login')}
                            className="pulse-hover"
                        >
                            Get Started🚀
                        </button>
                        <button 
                            className="secondary pulse-hover" 
                            onClick={handleLearnMoreClick}
                        >
                            Learn More ℹ️
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section 
                id="Features"
                ref={featuresRef}
                className="features-section"
            >
                <h2>Why SkillUp?</h2>
                <div className="features-grid">
                    {[ 
                        {
                            title: 'Personalized Learning Paths',
                            description: 'Tailored learning paths based on your goals and interests, providing adaptive suggestions for continuous growth.',
                            icon: '📚'
                        },
                        {
                            title: 'Verified Mentors and Learners',
                            description: 'Connect with verified mentors and experienced professionals to ensure authentic and meaningful skill exchanges.',
                            icon: '✅'
                        },
                        {
                            title: 'Flexible Scheduling',
                            description: 'Schedule learning and mentoring sessions at your convenience.',
                            icon: '📅'
                        },
                        {
                            title: 'Skill Endorsements and Badges',
                            description: 'Earn endorsements from mentors to build credibility and display achievement badges on your profile.',
                            icon: '🏅'
                        },
                        {
                            title: 'Community and Networking',
                            description: 'Join vibrant learning communities, participate in discussions, and attend virtual meetups to collaborate on projects.',
                            icon: '🌐'
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
                id="How it Works?"
                ref={howItWorksRef}
                className="how-it-works"
            >
                <h2>How SkillUp Works?</h2>
                <div className="steps-container">
                    {[ 
                        { number: "1", title: "Create Profile📋", description: "Set up your profile and showcase your skills." },
                        { number: "2", title: "Find Match🔍", description: "Browse and connect with skill exchange partners." },
                        { number: "3", title: "Learn & Grow🎓", description: "Exchange knowledge through structured sessions." },
                        { number: "4", title: "Earn Credits🏅", description: "Receive credits for your skills after each session." }, 
                        { number: "5", title: "Track Your Progress📊", description: "Monitor your learning and skill growth over time." }
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
                id="Testimonials"   
                ref={testimonialsRef}
                className="testimonials-section"
            >
                <h2>Testimonials</h2>
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
        </div>
    );
};

export default LandingPage;
