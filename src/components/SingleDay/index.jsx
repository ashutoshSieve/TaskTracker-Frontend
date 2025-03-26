import React, { useState, useEffect } from "react";
import "./style.css";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useParams } from "react-router-dom";

function SingleDay() {
    const { id, date, month, year } = useParams();
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editingTask, setEditingTask] = useState(null);
    const [editedText, setEditedText] = useState("");
    const [quote, setQuote] = useState("");

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

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`https://tasktracker-backend-4yas.onrender.com/workDetail/${id}?date=${date}&month=${month}&year=${year}`, {
                    method: "GET",
                    credentials: "include",
                });
                const data = await response.json();
                setTasks(data.work || []);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, [id, date, month, year]);

    const addTask = async () => {
        if (newTask.trim() === "") return;

        try {
            await fetch("https://tasktracker-backend-4yas.onrender.com/addTask", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, date: Number(date), month, year: Number(year), taskText: newTask, completed: false }),
            });

            setTasks([...tasks, { text: newTask, completed: false }]);
            setNewTask("");
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const deleteTask = async (taskText) => {
        try {
            await fetch("https://tasktracker-backend-4yas.onrender.com/deleteTask", {
                method: "DELETE",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, date, month, year, taskText }),
            });
            setTasks(tasks.filter(task => task.text !== taskText));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const saveEditing = async (oldTaskText) => {
        try {
            await fetch("https://tasktracker-backend-4yas.onrender.com/updateTask", {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, date, month, year, oldTaskText, newTaskText: editedText }),
            });
            setTasks(tasks.map(task => task.text === oldTaskText ? { ...task, text: editedText } : task));
            setEditingTask(null);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const toggleTaskCompletion = async (taskText) => {
        try {
            const updatedTasks = tasks.map(task =>
                task.text === taskText ? { ...task, isComplete: !task.isComplete } : task
            );
    
            await fetch("https://tasktracker-backend-4yas.onrender.com/toggleTaskCompletion", {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    id, 
                    date, 
                    month, 
                    year, 
                    taskText, 
                    completed: !tasks.find(task => task.text === taskText).isComplete 
                }),
            });
    
            setTasks(updatedTasks);
        } catch (error) {
            console.error("Error updating task completion:", error);
        }
    };
    

    return (
        <div className="single-day-page">
            <Navbar />
            <div className="single-day-container">
                <h2 className="date-heading">{date} {month}</h2>
                <h3 className="main-quote">{quote ? quote : "Loading..."}</h3>

                <div className="task-input-container">
                    <input 
                        type="text" 
                        value={newTask} 
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Add a new task..."
                        className="task-input"
                    />
                    <button onClick={addTask} className="add-task-btn">+</button>
                </div>

                <div className="task-list">
                    {tasks.length === 0 ? (
                        <p className="no-tasks">No tasks for this day.</p>
                    ) : (
                        tasks.map((task, index) => (
                            <div key={index} className={`task-card ${task.isComplete ? "completed" : ""}`}>
                                {editingTask === task.text ? (
                                    <input 
                                        type="text" 
                                        value={editedText} 
                                        onChange={(e) => setEditedText(e.target.value)}
                                        className="edit-task-input"
                                    />
                                ) : (
                                    <p className="task-text">{task.text}</p>
                                )}

                                <div className="task-actions">
                                    {editingTask === task.text ? (
                                        <button onClick={() => saveEditing(task.text)} className="save-btn1">💾</button>
                                    ) : (
                                        <button onClick={() => { setEditingTask(task.text); setEditedText(task.text); }} className="edit-btn1">✏️</button>
                                    )}
                                    <button onClick={() => deleteTask(task.text)} className="delete-btn1">🗑️</button>

                                    <input 
                                        type="checkbox"
                                        checked={task.isComplete}
                                        onChange={() => toggleTaskCompletion(task.text)}
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SingleDay;
