import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function CategoryManager({ categories, setCategories }) {
    const [newCat, setNewCat] = useState('');

    // Add new category
    const add = () => {
        const trimmed = newCat.trim();
        if (trimmed) {
            setCategories([...categories, trimmed]);
            setNewCat('');
        }
    };

    // Remove category
    const remove = index => {
        const updated = Array.from(categories);
        updated.splice(index, 1);
        setCategories(updated);
    };

    // Handle drag end to reorder categories
    const onDragEnd = result => {
        if (!result.destination) return;
        const reordered = Array.from(categories);
        const [moved] = reordered.splice(result.source.index, 1);
        reordered.splice(result.destination.index, 0, moved);
        setCategories(reordered);
    };

    return (
        <div className="CategoryManager">
            <h2>Manage Categories</h2>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="categories">
                    {provided => (
                        <ul
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {categories.map((cat, idx) => (
                                <Draggable key={cat + idx} draggableId={cat + idx} index={idx}>
                                    {providedItem => (
                                        <li
                                            ref={providedItem.innerRef}
                                            {...providedItem.draggableProps}
                                            {...providedItem.dragHandleProps}
                                        >
                                            <span>{cat}</span>
                                            <button onClick={() => remove(idx)}>Remove</button>
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
            <div className="input-row">
                <input
                    value={newCat}
                    onChange={e => setNewCat(e.target.value)}
                    placeholder="New category"
                />
                <button onClick={add}>Add</button>
            </div>
        </div>
    );
}