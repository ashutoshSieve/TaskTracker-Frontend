import React, { useState, useEffect } from "react";
import "./style.css";
import Navbar from "../Navbar";
import Footer from "../Footer";
import TaskCreate from "../TaskCreate";
import { useNavigate } from "react-router-dom";

function Main() {
    const [user, setUser] = useState("");
    const [quote, setQuote] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://tasktracker-backend-4yas.onrender.com/home", {
            method: "GET",
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.redirect) {
                window.location.href = data.redirect;
            }
            if (data.name) {
                setUser(data);
            } else {
                console.error("User not found");
            }
        })
        .catch((err) => console.error("Authentication error:", err));
    }, []);

    useEffect(() => {
        fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://zenquotes.io/api/today"))
            .then((res) => res.json())
            .then((data) => {
                const parsedData = JSON.parse(data.contents);
                if (parsedData[0] && parsedData[0].q) {
                    setQuote(`"${parsedData[0].q}"`);
                } else {
                    console.error("Quote not found");
                }
            })
            .catch((err) => console.error("Error:", err));
    }, []);

    return (
        <div className="main-page">
            <Navbar />
            <div className="main-container">
                <h3 className="main-welcome">{user ? `Welcome, ${user.name}` : "Loading..."}</h3> 
                <h3 className="main-quote">{quote ? quote : "Loading..."}</h3>

                {/* Task Creation Section */}
                <section className="task-section">
                    <h2 className="section-title">Create a New Task</h2>
                    <TaskCreate />
                </section>

                {/* NotePad Section */}
                <section className="notepad-section">
                    <h2 className="section-title">Notepad </h2>
                    <button className="main-btn main-btn-notepad" onClick={() => navigate("/notepad")}>+</button>
                </section>


                {/* Ongoing Tasks Section */}
                <section className="ongoing-section">
                    <h2 className="section-title">Ongoing Tasks</h2>
                    <button className="main-btn main-btn-ongoing" onClick={() => navigate("/onGoing")}>View Ongoing Tasks</button>
                </section>

                {/* Completed Tasks Section */}
                <section className="completed-section">
                    <h2 className="section-title">Completed Tasks</h2>
                    <button className="main-btn main-btn-completed" onClick={() => navigate("/completed")}>View Completed Tasks</button>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default Main;
