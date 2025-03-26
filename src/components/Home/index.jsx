import React from "react";
import "./style.css";

function Home() {
    return (
        <div className="home-container">
            {/* Background Video */}
            <video autoPlay loop muted className="background-video">
                <source src="/images/original-b95c9e13ea54b7073f0c54afeb6e6851.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Dark Overlay for Better Visibility */}
            <div className="overlay"></div>

            {/* Content */}
            <div className="content">
                <h1>Task Tracker</h1>
                <p>Manage your tasks efficiently and stay organized with our simple yet powerful Task Tracker.</p>
                <div className="buttons">
                    <a className="login-btn" href="/login">Login</a>
                    <a className="signup-btn" href="/signup">Signup</a>
                </div>
            </div>
        </div>
    );
}

export default Home;
