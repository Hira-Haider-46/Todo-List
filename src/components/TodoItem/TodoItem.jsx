import React, { useState } from 'react';
import './TodoItem.css';

function TodoItem({ taskId, taskText, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(taskText);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (newText !== taskText) {
      editTask(taskId, newText);
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
          <i className="fa-solid fa-check" onClick={handleSave}></i>
        ) : (
          <i className="fa-regular fa-pen-to-square" onClick={handleEditClick}></i>
        )}
        <i className="fa-solid fa-trash" onClick={() => deleteTask(taskId)}></i>
      </div>
    </div>
  );
}

export default TodoItem;