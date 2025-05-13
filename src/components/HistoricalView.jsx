import React, { useState, useEffect } from 'react';
import CalendarView from './CalendarView';
import { format } from 'date-fns';

export default function HistoricalView({ onDayClick }) {
    const [history, setHistory] = useState([]);
    const [viewDate, setViewDate] = useState(new Date());

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('reflectHistory') || '[]');
        setHistory(stored);
    }, []);

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const prevMonth = () => setViewDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
    const nextMonth = () => setViewDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));

    return (
        <div className="history-container">
            <div className="history-header">
                <button onClick={prevMonth}>&lt;</button>
                <h2>{format(viewDate, 'LLLL yyyy')}</h2>
                <button onClick={nextMonth}>&gt;</button>
            </div>
            <CalendarView
                year={year}
                month={month}
                history={history}
                onDayClick={onDayClick}
            />
            <div className="legend">
                <div><span className="dot none"></span> No Reflection</div>
                <div><span className="dot done"></span> Completed</div>
                <div><span className="dot all"></span> All Satisfied</div>
            </div>
        </div>
    );
}