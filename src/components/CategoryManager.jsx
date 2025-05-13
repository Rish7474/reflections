import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function CategoryManager({ categories, setCategories }) {
    const [newCat, setNewCat] = useState('');

    const add = () => {
        if (!newCat.trim()) return;
        setCategories(prev => [...prev, newCat.trim()]);
        setNewCat('');
    };
    const remove = idx => {
        setCategories(categories.filter((_, i) => i !== idx));
    };
    const onDragEnd = result => {
        if (!result.destination) return;
        const items = Array.from(categories);
        const [moved] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, moved);
        setCategories(items);
    };

    return (
        <div className="CategoryManager card-container">
            <h2 className="cm-title">Manage Categories</h2>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="categories">
                    {provided => (
                        <ul className="cm-list" {...provided.droppableProps} ref={provided.innerRef}>
                            {categories.map((cat, index) => (
                                <Draggable key={cat + index} draggableId={cat + index} index={index}>
                                    {prov => (
                                        <li
                                            className="cm-item"
                                            ref={prov.innerRef}
                                            {...prov.draggableProps}
                                            {...prov.dragHandleProps}
                                        >
                                            <span className="cm-text">{cat}</span>
                                            <button className="cm-remove" onClick={() => remove(index)}>×</button>
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
            <div className="cm-input-row">
                <input
                    className="cm-input"
                    value={newCat}
                    onChange={e => setNewCat(e.target.value)}
                    placeholder="New category"
                />
                <button className="cm-add-button" onClick={add}>Add</button>
            </div>
        </div>
    );
}