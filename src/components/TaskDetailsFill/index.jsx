import React, { useEffect, useState } from "react";
import "./style.css";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useParams, Link, useNavigate } from "react-router-dom";

function TaskDetails() {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [monthHeading, setMonthHeading] = useState("Task Overview");
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const currentDay = today.getDate();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    
    const monthNames = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];
    const currentMonthName = monthNames[month];

    useEffect(() => {
        fetch(`https://tasktracker-backend-4yas.onrender.com/details/${id}`, {
            method: "GET",
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.redirect) {
                window.location.href = data.redirect;
            }
            setTask(data.task);
            setMonthHeading(data.task?.monthHeading || "Task Overview"); 
        })
        .catch((err) => console.error("Error fetching task details:", err));
    }, [id]);

    const updateMonthHeading = () => {
        fetch(`https://tasktracker-backend-4yas.onrender.com/updateMonthHeading/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ monthHeading }),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                setIsEditing(false);
            }
        })
        .catch((err) => console.error("Error updating month heading:", err));
    };

    return (
        <div className="task-details-page">
            <Navbar />
            <div className="task-details-container">
                <button className="past-tracks-btn" onClick={() => navigate(`/passed/${id}`)}>
                    Past Tracks
                </button>

                
                <div className="month-heading-container">
                    {isEditing ? (
                        <input
                            type="text"
                            value={monthHeading}
                            onChange={(e) => setMonthHeading(e.target.value)}
                            className="edit-month-heading"
                        />
                    ) : (
                        <h2 className="month-heading">{monthHeading}</h2>
                    )}
                    <button onClick={isEditing ? updateMonthHeading : () => setIsEditing(true)} className="edit-btn">
                        {isEditing ? "Save" : "Edit"}
                    </button>
                </div>

                
                <h3 className="current-month">{currentMonthName} {year}</h3>

                
                {task ? (
                    <div className="task-card">
                        <h3 className="task-name">{task.name}</h3>
                        <p className="task-date"><strong>Start Date:</strong> {task.sd}</p>
                        <p className="task-date"><strong>End Date:</strong> {task.ed}</p>
                    </div>
                ) : (
                    <p>Loading task details...</p>
                )}

                
                <div className="calendar">
                    {[...Array(daysInMonth)].map((_, day) => {
                        const dateNumber = day + 1;
                        const isPast = dateNumber < currentDay;

                        return (
                            <Link
                                key={dateNumber}
                                to={`/singleDay/${id}/${dateNumber}/${currentMonthName}/${year}`}
                                className={`calendar-day ${isPast ? "past-date" : ""}`}
                            >
                                {dateNumber}
                            </Link>
                        );
                    })}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default TaskDetails;
