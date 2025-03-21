import React, { useState, useEffect } from "react";
import "./style.css";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useParams, Link } from "react-router-dom";

function Passed() {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [collapsedYears, setCollapsedYears] = useState({});
    const [subHeadings, setSubHeadings] = useState({});

    useEffect(() => {
        fetch(`https://tasktracker-backend-4yas.onrender.com/details/${id}`, {
            method: "GET",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                setTask(data.task);
            })
            .catch(err => console.error("Error fetching task details:", err));
    }, [id]);

    if (!task) return <p>Loading task details...</p>;

    const startDate = new Date(task.sd);
    const endDate = new Date(); // Today
    startDate.setDate(1);
    
    let calendarData = {};
    
    for (let d = new Date(startDate); d <= endDate; d.setMonth(d.getMonth() + 1)) {
        const year = d.getFullYear();
        const month = d.toLocaleString("default", { month: "long" });
        
        if (!calendarData[year]) calendarData[year] = {};
        if (!calendarData[year][month]) calendarData[year][month] = [];
        
        let daysInMonth = new Date(year, d.getMonth() + 1, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
            let dateString = `${year}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            let isPast = new Date(dateString) < endDate;
            calendarData[year][month].push({ day, isPast });
        }
    }

    const toggleYear = (year) => {
        setCollapsedYears(prev => ({ ...prev, [year]: !prev[year] }));
    };

    const handleSubheadingChange = (year, month, value) => {
        setSubHeadings(prev => ({ ...prev, [`${year}-${month}`]: value }));
    };

    return (
        <div>
            <Navbar />
            <div className="passed-container">
                <h2>Complted Tasks</h2>

                <div className="task-card">
                    <h3 className="task-name">{task.name}</h3>
                    <p className="task-date"><strong>Start Date:</strong> {task.sd}</p>
                    <p className="task-date"><strong>End Date:</strong> {task.ed}</p>
                </div>

                {Object.keys(calendarData).reverse().map(year => (
                    <div key={year} className="year-section">
                        <button className="year-toggle" onClick={() => toggleYear(year)}>
                            {collapsedYears[year] ? "▶" : "▼"} {year}
                        </button>
                        {!collapsedYears[year] && (
                            <div className="months-container">
                                {Object.keys(calendarData[year]).map(month => (
                                    <div key={month} className="month-section">
                                        <input 
                                            type="text" 
                                            className="month-subheading" 
                                            value={subHeadings[`${year}-${month}`] || month} 
                                            onChange={(e) => handleSubheadingChange(year, month, e.target.value)}
                                        />
                                        <div className="calendar-grid">
                                            {calendarData[year][month].map(({ day, isPast }) => (
                                                <Link 
                                                    key={day} 
                                                    to={`/singleDay/${id}/${day}/${month}/${year}`} 
                                                    className={`calendar-day ${isPast ? "past-date" : ""}`}
                                                >
                                                    {day}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default Passed;
