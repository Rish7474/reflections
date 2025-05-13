import React from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format, isAfter, startOfToday } from 'date-fns';

export default function CalendarView({ year, month, history, onDayClick }) {
    const monthStart = startOfMonth(new Date(year, month));
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const today = startOfToday();

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            const dateKey = format(day, 'yyyy-MM-dd');
            const entry = history.find(d => d.date === dateKey);
            let status = 'none';
            if (entry) {
                const allSatisfied = Object.values(entry.responses).every(r => r.done);
                status = allSatisfied ? 'all' : 'done';
            }
            const isFuture = isAfter(day, today);
            days.push(
                <div
                    key={dateKey}
                    className={`cal-day ${status} ${day.getMonth() !== month ? 'outside' : ''} ${isFuture ? 'disabled' : ''}`}
                    onClick={() => !isFuture && onDayClick(dateKey)}
                >
                    <span className="date-label">{format(day, 'd')}</span>
                </div>
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div key={day} className="cal-row">
                {days}
            </div>
        );
        days = [];
    }

    return <div className="calendar-grid">{rows}</div>;
}