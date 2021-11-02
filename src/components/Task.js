import React from 'react';
import { FaTimes } from 'react-icons/fa'
const Task = ({ task: { id, text, day, reminder }, onClick, onToggle }) => {

    return (
        <div className={`task ${reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(id)}>
            <h3>{text} <FaTimes style={{ color: 'red' }} onClick={() => onClick(id)} /></h3>
            <p>{day}</p>
        </div>
    )
}

export default Task