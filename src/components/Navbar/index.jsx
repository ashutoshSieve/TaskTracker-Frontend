import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch("https://tasktracker-backend-4yas.onrender.com/logout", {
                method: "POST",
                credentials: "include",
            });

            if (response.ok) {
                localStorage.removeItem("token"); // Clear token from storage
                sessionStorage.clear();
                navigate("/login"); // Redirect to login page
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <nav className="navbar">
            <div className="logo">Task Tracker</div>
            
            <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </div>
            
            <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
                <li><a href="/">Home</a></li>
                <li><a href="/main">Main</a></li>
            </ul>

            <div className="auth-buttons">
                <button className="nav-button login" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
}

export default Navbar;
