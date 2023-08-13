import React from 'react';
import '../styles/Home.css';
import video from "../assets/background-video.mp4";
import TeamMember from '../components/TeamMember ';

const Home = () => {
    return (
        <div className="home-page">
            <div className="hero-section">
                <video className="background-video" src={video} autoPlay loop muted />
                <div className="overlay"></div>
                <div className="text-overlay">
                    <h1 className="welcome-message">Welcome to Car Maintenance Tracker</h1>
                    <p className="description">Keep track of your car's maintenance history with ease.</p>
                </div>
            </div>

            <div className="feature-section">
                <h2>Discover Our Features</h2>
                <p>Get the right value for your car</p>
                <p>Easy Maintenance Recording</p>
                <p>Comprehensive Car Reports</p>
                <p>Shop for Used Car</p>
            </div>

            <div className="team-section">
                <h2>Meet the Team</h2>
                <div className="team-members">
                    <TeamMember
                        name="John Doe"
                        role="Founder & CEO"
                        bio="Passionate about cars and technology."
                        imageUrl="path-to-john-doe-image.jpg"
                    />
                    {/* Add more TeamMember components for other team members */}
                </div>
            </div>

            <div className="cta-section">
                <h2>Get Started Today</h2>
                <p>Join us now and experience the future of car maintenance management.</p>
                <button>Sign Up</button>
            </div>
        </div>
    );
};

export default Home;
