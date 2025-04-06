import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
    const [visible, setVisible] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos]);

    const handleLogout = async () => {
        try {
            const response = await fetch("https://tasktracker-backend-4yas.onrender.com/logout", {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                navigate("/login");
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <nav className={`navbar ${visible ? "" : "hidden"}`}>
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
