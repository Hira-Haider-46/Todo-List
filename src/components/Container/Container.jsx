import React, { useState, useEffect } from 'react';
import TodoItem from '../TodoItem';
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase.js';
import './Container.css';

function Container() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingAdd, setLoadingAdd] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setLoading(true);
        const tasksCollection = collection(db, 'tasks');
        const tasksSnapshot = await getDocs(tasksCollection);

        const tasksData = tasksSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                date: data.date.toDate()
            };
        });

        const sortedTasks = tasksData.sort((a, b) => b.date - a.date);
        setTasks(sortedTasks);
        setLoading(false);
    };

    const handleAddTask = async () => {
        if (task.trim()) {
            setLoadingAdd(true);

            const currentDate = Timestamp.now();

            const tasksCollection = collection(db, 'tasks');
            const docRef = await addDoc(tasksCollection, {
                text: task,
                date: currentDate
            });

            const newTask = { id: docRef.id, text: task, date: currentDate.toDate() };
            const updatedTasks = [...tasks, newTask];

        
            const sortedTasks = updatedTasks.sort((a, b) => b.date - a.date);
            setTasks(sortedTasks);

            setTask('');
            setLoadingAdd(false);
        }
    };

    const handleDeleteTask = async (id) => {
        const taskDoc = doc(db, 'tasks', id);
        await deleteDoc(taskDoc);
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleEditTask = async (id, newText) => {
        const taskDoc = doc(db, 'tasks', id);
        const newDate = Timestamp.now();

        await updateDoc(taskDoc, {
            text: newText,
            date: newDate
        });

        const updatedTasks = tasks.map(task => task.id === id ? { ...task, text: newText, date: newDate.toDate() } : task);
        const sortedTasks = updatedTasks.sort((a, b) => b.date - a.date);
        setTasks(sortedTasks);
    };

    const filteredTasks = tasks.filter(task =>
        task.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container">
            <div className="search">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                <button
                    onClick={handleAddTask}
                    disabled={loadingAdd || !task.trim()}  // Disable for empty task
                >
                    {loadingAdd ? <i className="fa-solid fa-spinner"></i> : 'Add Task'}
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map(task => (
                            <TodoItem
                                key={task.id}
                                taskId={task.id}
                                taskText={task.text}
                                taskDate={task.date}
                                deleteTask={handleDeleteTask}
                                editTask={handleEditTask}
                            />
                        ))
                    ) : (
                        <p>No tasks found</p>
                    )}
                </>
            )}
        </div>
    );
}

export default Container;