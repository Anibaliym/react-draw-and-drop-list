import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

export const DraggableItem = ({ item, index, moveItem, handleDrop }) => {
    const ref = React.useRef(null);

    // Configuración del "drop" para gestionar cuando un ítem es soltado sobre otro
    const [, drop] = useDrop({
        accept: 'ITEM',
        hover(draggedItem) {
            if (draggedItem.index !== index) {
                moveItem(draggedItem.index, index); // Cambia la posición de los ítems
                draggedItem.index = index; // Actualiza el índice del ítem arrastrado
            }
        },
    });

    // Configuración del "drag" para hacer que el ítem sea arrastrable
    const [{ isDragging }, drag] = useDrag({
        type: 'ITEM',
        item: { type: 'ITEM', index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(), // Indica si el ítem está siendo arrastrado
        }),
        end: () => {
            handleDrop(); 
        }
    });

    // Conectar el "drag" y el "drop" al mismo ref
    drag(drop(ref));

    return (
        <li 
            ref={ ref } className={`list-group-item d-flex justify-content-between align-items-center ${ isDragging ? 'dragging' : '' }`}
            style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>
            {item.text}
            <button className="btn btn-outline-secondary btn-sm">Arrastrar</button>
        </li>
    );
};

