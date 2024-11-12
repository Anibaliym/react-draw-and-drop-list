import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DraggableItem } from './DraggableItem';
import 'bootstrap/dist/css/bootstrap.min.css';

const initialState = [
    { order: 1, elementId: '1', text: 'Elemento 1' },
    { order: 2, elementId: '2', text: 'Elemento 2' },
    { order: 3, elementId: '3', text: 'Elemento 3' },
    { order: 4, elementId: '4', text: 'Elemento 4' },
]; 

export const App = () => {
    
    const [items, setItems] = useState(initialState);

    const moveItem = (dragIndex, hoverIndex) => {
        const updatedItems = [...items];
        
        // Extrae el elemento arrastrado
        const [draggedItem] = updatedItems.splice(dragIndex, 1);

        // Inserta el elemento arrastrado en la nueva posición
        updatedItems.splice(hoverIndex, 0, draggedItem);

        // Actualiza el valor de "order" en cada elemento basado en su nuevo índice
        const reorderedItems = updatedItems.map((item, index) => ({
            ...item,
            order: index + 1, // Asigna el nuevo valor de "order" basado en la posición
        }));

        setItems(reorderedItems);
    };

    const handleDrop = () => {
        // console.log("Nuevo orden:", items.map(item => ({ elementId: item.elementId, order: item.order })));
        console.log("Nuevo orden:", items);

    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="container mt-5">
                <h3 className="mb-4">Lista Drag and Drop con React DnD</h3>
                <ul className="list-group">
                    { 
                        items.map((item, index) => (
                            <DraggableItem
                                key={item.elementId} // Asegura que el key sea único y constante
                                item={item}
                                index={index}
                                moveItem={moveItem}
                                handleDrop={handleDrop}
                            />
                        ))
                    }
                </ul>
                <button
                    className="btn btn-primary mt-3"
                    onClick={() => console.log(items)}
                >
                    Guardar Orden
                </button>
            </div>
        </DndProvider>
    );
};