import React, { useState } from 'react';
import { FiSettings, FiClock, FiArrowLeft } from 'react-icons/fi';
import CategoryManager from './components/CategoryManager';
import Reflect from './components/Reflect';
import HistoricalView from './components/HistoricalView';

export default function App() {
    const [categories, setCategories] = useState([
        'Fitness',
        'Career Development',
        'Social Relationships',
    ]);
    const [mode, setMode] = useState('reflect');

    const renderContent = () => {
        switch (mode) {
            case 'categories':
                return <CategoryManager categories={categories} setCategories={setCategories} />;
            case 'history':
                return <HistoricalView />;
            default:
                return <Reflect categories={categories} />;
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
                <h1 className="header-title">Reflect</h1>
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
