import React, { useState } from 'react';
import { FiSettings, FiClock, FiArrowLeft } from 'react-icons/fi';
import { format } from 'date-fns';
import CategoryManager from './components/CategoryManager';
import Reflect from './components/Reflect';
import HistoricalView from './components/HistoricalView';

export default function App() {
    const [categories, setCategories] = useState([
        'Fitness',
        'Career Development',
        'Hobbies',
    ]);
    const [mode, setMode] = useState('reflect');
    const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));

    const handleDateSelect = date => {
        setSelectedDate(date);
        setMode('reflect');
    };

    var headerTitle = ''
    if (mode === 'reflect')
        headerTitle = format(new Date(selectedDate), 'PPP');
    else if (mode === 'categories')
        headerTitle = 'Settings';
    else if (mode === 'history')
        headerTitle = 'History';

    const renderContent = () => {
        switch (mode) {
            case 'categories':
                return <CategoryManager categories={categories} setCategories={setCategories} />;
            case 'history':
                return <HistoricalView onDayClick={handleDateSelect} />;
            default:
                return <Reflect categories={categories} dateKey={selectedDate} />;
        }
    };

    return (
        <div className="app-container">
            <header className="app-header">
                {mode !== 'reflect' && (
                    <button className="back-btn" onClick={() => setMode('reflect')}>
                        <FiArrowLeft />
                    </button>
                )}
                <h1 className="header-title">{headerTitle}</h1>
                {mode === 'reflect' && (
                    <div className="header-menu">
                        <button onClick={() => setMode('categories')}>
                            <FiSettings />
                        </button>
                        <button onClick={() => setMode('history')}>
                            <FiClock />
                        </button>
                    </div>
                )}
            </header>
            <main>{renderContent()}</main>
        </div>
    );
}