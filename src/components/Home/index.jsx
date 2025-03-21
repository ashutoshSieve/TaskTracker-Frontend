import React from "react";
import "./style.css";

function Home() {
    return (
        <div className="home-container">
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
