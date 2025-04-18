import React, {useState,useEffect} from "react";
import "./style.css";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";


function Completed(){

    const [user, setUser] = useState("");
    const navigate=useNavigate();
    
    const handleTaskClick = (id) => {
        navigate(`/passed/${id}`);
    };

    useEffect(() => {
        fetch("https://tasktracker-backend-uj5o.onrender.com/completed", {
            method: "GET",
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.redirect) {
                window.location.href = data.redirect;
            }
            setUser(data.tasks || []);
        })
        .catch((err) => console.error("Authentication error:", err));
    }, []);
    
    return (
        <div className="completed-page">
            <Navbar />
            <div className="completed-container">
                <h3>Completed Tasks</h3>
                {user.length > 0 ? (
                    <ul className="completed-list">
                        {user.map((item) => (
                            <li key={item._id} onClick={() => handleTaskClick(item._id)}className="clickable-task">
                                {item.name}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-tasks">No tasks have been completed yet.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Completed;
