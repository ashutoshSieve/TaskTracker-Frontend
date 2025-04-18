import React, { useState, useEffect } from "react";
import "./style.css";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Warn from "../Warn";

function OnGoing() {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [showWarn, setShowWarn] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null); 

    const handleTaskClick = (id) => {
        navigate(`/taskDetails/${id}`);
    };

    useEffect(() => {
        fetch("https://tasktracker-backend-uj5o.onrender.com/onGoings", {
            method: "GET",
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.redirect) {
                    window.location.href = data.redirect;
                }
                setTasks(data.tasks || []);
            })
            .catch((err) => console.error("Authentication error:", err));
    }, []);

    const handleDeleteClick = (id) => {
        setTaskToDelete(id); 
        setShowWarn(true); 
    };

    const confirmDelete = () => {
        if (!taskToDelete) return;

        fetch(`https://tasktracker-backend-uj5o.onrender.com/deleteTask/${taskToDelete}`, {
            method: "DELETE",
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("Task deleted:", data);
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskToDelete));
            setShowWarn(false);
            setTaskToDelete(null);
        })
        .catch((err) => console.error("Error deleting task:", err));
    };

    return (
        <div  className="ongoing-page">
            <Navbar />
            <div className="ongoing-container">
                <h3>Ongoing Tasks</h3>
                {tasks.length > 0 ? (
                    <ul className="ongoing-list">
                        {tasks.map((task) => (
                            <li key={task._id} className="clickable-task">
                                <span className="task-name" onClick={() => handleTaskClick(task._id)}>
                                    {task.name}
                                </span>
                                <a href={`/graph/${task.name}`}>graph</a>
                                <span className="task-date">{task.sd} - {task.ed}</span>
                                
                                {/* Delete Button with Trash Icon */}
                                <button onClick={() => handleDeleteClick(task._id)} className="delete-btn">
                                    <FaTrash className="trash-icon" />
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-tasks">No ongoing tasks available.</p>
                )}
            </div>
            <Footer />

            
            <Warn 
                show={showWarn} 
                onClose={() => setShowWarn(false)} 
                onConfirm={confirmDelete} 
            />
        </div>
    );
}

export default OnGoing;
