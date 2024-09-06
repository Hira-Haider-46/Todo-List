import React, { useState, useEffect } from 'react';
import TodoItem from '../TodoItem';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.js';
import './Container.css';

function Container() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const tasksCollection = collection(db, 'tasks');
            const tasksSnapshot = await getDocs(tasksCollection);
            const tasksData = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTasks(tasksData);
        };
        fetchTasks();
    }, []);

    const handleAddTask = async () => {
        if (task) {
            const tasksCollection = collection(db, 'tasks');
            const docRef = await addDoc(tasksCollection, { text: task });
            setTasks([...tasks, { id: docRef.id, text: task }]);
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
            {tasks.map((task) => (
                <TodoItem key={task.id} taskText={task.text} />
            ))}
        </div>
    );
}

export default Container;