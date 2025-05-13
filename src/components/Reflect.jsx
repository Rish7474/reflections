import React, { useState, useCallback, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { motion, AnimatePresence } from 'framer-motion';

export default function Reflect({ categories }) {
    const [idx, setIdx] = useState(0);
    const [responses, setResponses] = useState({});
    const [notes, setNotes] = useState('');
    const [satisfied, setSatisfied] = useState(false);
    const current = categories[idx];

    // Load saved entry on index change
    useEffect(() => {
        const resp = responses[current];
        if (resp) {
            setSatisfied(resp.done);
            setNotes(resp.note);
        } else {
            setSatisfied(false);
            setNotes('');
        }
    }, [idx, responses, current]);

    const record = useCallback(() => {
        setResponses(prev => ({
            ...prev,
            [current]: { done: satisfied, note: notes },
        }));
    }, [current, satisfied, notes]);

    const navigate = useCallback(
        delta => {
            record();
            setIdx(i => (i + delta + categories.length) % categories.length);
        },
        [categories.length, record]
    );

    const handlers = useSwipeable({
        onSwipedRight: () => navigate(1),
        onSwipedLeft: () => navigate(-1),
        trackMouse: true,
    });

    const onClickNav = e => {
        if (e.target !== e.currentTarget) return;
        const { left, width } = e.currentTarget.getBoundingClientRect();
        e.clientX - left > width / 2 ? navigate(1) : navigate(-1);
    };

    return (
        <div
            {...handlers}
            className="reflect-card"
            onClick={onClickNav}
        >
            <AnimatePresence exitBeforeEnter>
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                    className="reflect-content"
                >
                    <h3>{current}</h3>
                    <label>
                        <input
                            type="checkbox"
                            checked={satisfied}
                            onChange={() => setSatisfied(s => !s)}
                        />
                        I feel satisfied
                    </label>
                    <textarea
                        placeholder="How do you feel? (optional)"
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                    />
                    <p className="nav-hint">Swipe or tap edges to navigate</p>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}