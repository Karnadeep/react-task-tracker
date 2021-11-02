import React from 'react'
import Task from './Task'

const Tasks = ({ tasks, onClick, onToggle }) => {
    return (
        <>
            {tasks.map(task =>
                <Task key={task.id} task={task} onClick={onClick} onToggle={onToggle} />
            )}
        </>)
}

export default Tasks