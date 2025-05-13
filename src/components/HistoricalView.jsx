import React, { useState, useEffect } from 'react';

export default function HistoricalView() {
    const [history, setHistory] = useState([]);
    useEffect(() => setHistory(JSON.parse(localStorage.getItem('reflectHistory') || '[]')), []);
    return (
        <div>
            <h2>History</h2>
            {history.map((day, i) => (
                <div key={i} className="history-day">
                    <h4>{day.date}</h4>
                    <ul>
                        {Object.entries(day.responses).map(([cat, resp]) => (
                            <li key={cat}>
                                <strong>{cat}:</strong> {resp.done ? '✅' : '❌'}<br />
                                {resp.note}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}