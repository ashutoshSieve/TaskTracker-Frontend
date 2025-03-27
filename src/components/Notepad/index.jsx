import React, { useState, useEffect } from "react";
import "./style.css";
import Navbar from "../Navbar";
import Footer from "../Footer";

function Notepad() {
    const [text, setText] = useState("");
    const [firstText, setfirstText] = useState("");
    
    useEffect(() => {
        fetch("https://tasktracker-backend-4yas.onrender.com/notepad", {
            method: "GET",
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                setfirstText(data.notePad);
                setText(data.notePad || "");  
            }
        })
        .catch((err) => console.error("Error fetching notepad:", err));
    }, []);

    
    const handleSave = () => {
        fetch(`https://tasktracker-backend-4yas.onrender.com/notepadAdd`, {
            method: "PUT",  
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text, firstText }) 
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                window.location.reload();
            }
        })
        .catch((err) => console.error("Error saving note:", err));
    };

    return (
        <div className="notepad-page">
            <Navbar />
            <div className="notepad-container">
                <div className="notepad">
                    <h2 className="notepad-title">Notepad</h2>
                    <textarea 
                        className="notepad-textarea"
                        placeholder="Start typing your notes here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button className="save-button2" onClick={handleSave}>Save Note</button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Notepad;
