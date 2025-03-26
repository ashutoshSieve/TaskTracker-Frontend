import React, { useState, useEffect } from "react";
import "./style.css";
import Navbar from "../Navbar";
import Footer from "../Footer";

function Notepad() {
    const [text, setText] = useState("");

    // Fetch the saved notes when the component loads
    useEffect(() => {
        fetch("https://tasktracker-backend-4yas.onrender.com/notepad", {
            method: "GET",
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                setText(data.notePad || "");  // Display existing notes
            }
        })
        .catch((err) => console.error("Error fetching notepad:", err));
    }, []);

    // Save Notes to the Backend
    const handleSave = () => {
        fetch(`https://tasktracker-backend-4yas.onrender.com/notepadAdd`, {
            method: "PUT",  // ✅ Changed from POST to PUT
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text }) // ✅ Wrapped `text` in an object
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                alert("Note saved successfully!");
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
