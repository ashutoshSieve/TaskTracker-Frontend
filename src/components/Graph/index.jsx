import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./style.css";

const COLORS = ["#00C49F", "#FFBB28", "#0088FE", "#FF8042"]; 

function Graph() {
    const [data, setData] = useState(null);
    const { name } = useParams(); 

    useEffect(() => {
        fetch(`https://tasktracker-backend-4yas.onrender.com/getGraph/${name}`, {
            method: "GET",
            credentials: "include" 
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setData(data);
            } else {
                console.error("Error fetching graph data:", data.message);
            }
        })
        .catch(err => console.error("Fetch error:", err));
    }, [name]);

    if (!data) return <div className="loading">Loading graph data...</div>;

    const pieChartData = [
        { name: "Today", value: data.todayCompletion },
        { name: "This Week", value: data.weekCompletion },
        { name: "This Month", value: data.monthCompletion },
        { name: "Overall", value: data.overallCompletion }
    ];

    const barChartData = [
        { name: "Today", Completion: data.todayCompletion },
        { name: "Week", Completion: data.weekCompletion },
        { name: "Month", Completion: data.monthCompletion },
        { name: "Overall", Completion: data.overallCompletion }
    ];

    return (
        <div className="graph-page">
            <Navbar />
            <div className="graph-container">
                <div className="graph-content">
                    <h2 className="graph-title">Task Completion Overview for "{name}"</h2>

                    <div className="charts">
                        
                        <div className="chart-container">
                            <h3>Completion Breakdown</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                                        {pieChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        
                        <div className="chart-container">
                            <h3>Progress Over Time</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={barChartData}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Completion" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Graph;
