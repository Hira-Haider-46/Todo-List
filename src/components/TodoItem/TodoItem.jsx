import React, { useState } from 'react';
import './TodoItem.css';

function TodoItem({ taskId, taskText, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(taskText);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (newText !== taskText) {
      setLoadingEdit(true); 
      await editTask(taskId, newText); 
      setLoadingEdit(false); 
    }
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setNewText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  const handleDeleteTask = async () => {
    setLoadingDelete(true);
    await deleteTask(taskId);
    setLoadingDelete(false); 
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span className="todo-text">{taskText}</span>
      )}
      
      <div className="todo-actions">
        {isEditing ? (
          loadingEdit ? (
            <i className="fa-solid fa-spinner"></i>
          ) : (
            <i className="fa-solid fa-check" onClick={handleSave}></i>
          )
        ) : (
          loadingEdit ? (
            <i className="fa-solid fa-spinner"></i>
          ) : (
            <i className="fa-regular fa-pen-to-square" onClick={handleEditClick}></i>
          )
        )}
        {loadingDelete ? (
          <i className="fa-solid fa-spinner"></i>
        ) : (
          <i className="fa-solid fa-trash" onClick={handleDeleteTask}></i>
        )}
      </div>
    </div>
  );
}

export default TodoItem;
