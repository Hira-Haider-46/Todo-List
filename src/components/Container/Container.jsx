import React, { useState } from 'react';
import TodoItem from '../TodoItem';
import './Container.css';

function Container() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    const handleAddTask = () => {
        if (task) {
            setTasks([...tasks, task]);
            setTask('');
        }
    };

    return (
        <div className="container">
            <div className="search">
                <input
                    type="text"
                    placeholder="Search tasks..."
                />
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <div className='add-task'>
                <input
                    type="text"
                    placeholder="Add a new Task..."
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button onClick={handleAddTask}>Add Task</button>
            </div>
            {tasks.map((task, index) => (
                <TodoItem key={index} taskText={task} />
            ))}
        </div>
    );
}

export default Container;