import React, { useState } from 'react';
import { FiSettings, FiClock, FiArrowLeft } from 'react-icons/fi';
import { format } from 'date-fns';
import CategoryManager from './components/CategoryManager';
import Reflect from './components/Reflect';
import HistoricalView from './components/HistoricalView';
import './styles.css';

export default function App() {
    const [categories, setCategories] = useState([
        'Fitness',
        'Career Development',
        'Social Relationships',
    ]);
    const [mode, setMode] = useState('reflect');
    const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));

    // Handle calendar date clicks
    const handleDateSelect = date => {
        setSelectedDate(date);
        setMode('reflect');
    };

    // Determine header title: show formatted date in Reflect mode
    const headerTitle =
        mode === 'reflect'
            ? format(new Date(selectedDate), 'PPP')
            : '';

    // Render content based on mode
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
                    <button
                        className="back-btn"
                        aria-label="Back to Reflect"
                        onClick={() => setMode('reflect')}
                    >
                        <FiArrowLeft />
                    </button>
                )}
                <h1 className="header-title">{headerTitle}</h1>
                {mode === 'reflect' && (
                    <div className="header-menu">
                        <button aria-label="Categories" onClick={() => setMode('categories')}>
                            <FiSettings />
                        </button>
                        <button aria-label="History" onClick={() => setMode('history')}>
                            <FiClock />
                        </button>
                    </div>
                )}
            </header>
            <main>{renderContent()}</main>
        </div>
    );
}