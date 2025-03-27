import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

function TaskCreate() {
    const navigate = useNavigate();
    const [message, setMessage] =useState("");
    const today = new Date().toISOString().split("T")[0]; 

    const [formData, setFormData] = useState({
        taskName: "",
        startDate: "",
        endDate: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://tasktracker-backend-4yas.onrender.com/create", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.status === 201) {
                navigate(`/taskDetails/${data.taskId}`);
            }
            setMessage(data.message);

        } catch (error) {
            setMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="task-container">
            {message && <p className="message">{message}</p>}
            <form className="task-form" onSubmit={handleSubmit}>
                <label className="form-label">Task Name</label>
                <input 
                    type="text" 
                    name="taskName" 
                    placeholder="Enter Task Name" 
                    value={formData.taskName} 
                    onChange={handleChange} 
                    required 
                    className="input-field"
                />

                <label className="form-label">Start Date</label>
                <input 
                    type="date" 
                    name="startDate" 
                    value={formData.startDate} 
                    onChange={handleChange} 
                    required 
                    min={today} 
                    className="input-field"
                />

                <label className="form-label">End Date</label>
                <input 
                    type="date" 
                    name="endDate" 
                    value={formData.endDate} 
                    onChange={handleChange} 
                    required 
                    min={formData.startDate || today}
                    className="input-field"
                />

                <button type="submit" className="create-button">Create Task</button>
            </form>
        </div>
    );
}

export default TaskCreate;
