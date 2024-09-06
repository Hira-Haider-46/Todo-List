import React, { useState, useEffect } from 'react';
import TodoItem from '../TodoItem';
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase.js';
import './Container.css';

function Container() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]); 
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true); 
    const [loadingAdd, setLoadingAdd] = useState(false); 

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true); 
            const tasksCollection = collection(db, 'tasks');
            const tasksSnapshot = await getDocs(tasksCollection);
            const tasksData = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTasks(tasksData);
            setLoading(false); 
        };
        fetchTasks();
    }, []);

    const handleAddTask = async () => {
        setLoadingAdd(true);
        if (task) {
            const tasksCollection = collection(db, 'tasks');
            const docRef = await addDoc(tasksCollection, { text: task });
            setTasks([...tasks, { id: docRef.id, text: task }]);
            setTask('');
        }
        setLoadingAdd(false);
    };

    const handleDeleteTask = async (id) => {
        const taskDoc = doc(db, 'tasks', id);
        await deleteDoc(taskDoc);
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleEditTask = async (id, newText) => {
        const taskDoc = doc(db, 'tasks', id);
        await updateDoc(taskDoc, { text: newText });
        setTasks(tasks.map(task => task.id === id ? { ...task, text: newText } : task));
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
                <button onClick={handleAddTask}>
                    {loadingAdd ? <i class="fa-solid fa-spinner"></i> : 'Add Task' }
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {filteredTasks.map((task) => (
                        <TodoItem
                            key={task.id}
                            taskId={task.id}
                            taskText={task.text}
                            deleteTask={handleDeleteTask}
                            editTask={handleEditTask}
                        />
                    ))}
                    
                    {filteredTasks.length === 0 && <p>No tasks found</p>}
                </>
            )}
        </div>
    );
}

export default Container;