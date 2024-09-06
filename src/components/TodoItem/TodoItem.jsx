import React from 'react';
import './TodoItem.css';

function TodoItem({ taskText }) {
  return (
    <div className="todo-item">
      <span className="todo-text">{taskText}</span>
      <div className="todo-actions">
        <i className="fa-regular fa-pen-to-square"></i>
        <i className="fa-solid fa-trash"></i>
      </div>
    </div>
  );
}

export default TodoItem;