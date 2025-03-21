import React from "react";
import "./style.css";

function Warn({ show, onClose, onConfirm }) {
    if (!show) return null; // Hide the warning if not triggered

    return (
        <div className="warn-overlay">
            <div className="warn-box">
                <h3>Are you sure?</h3>
                <p>This action will permanently delete the task.</p>
                <div className="warn-buttons">
                    <button className="cancel-btn" onClick={onClose}>Cancel</button>
                    <button className="delete-btn" onClick={onConfirm}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default Warn;
