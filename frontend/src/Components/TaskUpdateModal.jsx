import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskUpdateModal = ({ task, isOpen, onClose, onUpdate ,}) => {
  const [updatedTitle, setUpdatedTitle] = useState(task?.title || "");
  const [updatedDescription, setUpdatedDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      let updatedData;
      if (task?.description) {
        updatedData = {
          title: updatedTitle,
          description: updatedDescription,
          status: status,
        };
      } else {
        updatedData = {
          title: updatedTitle,
          status: status,
        };
      }
      
      onUpdate(task.todo_id, updatedData); 
      
      onClose();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  

  // Set the default values when the task prop changes
  useEffect(() => {
    if (task) {
      setUpdatedTitle(task.title);
      setUpdatedDescription(task.description || "");
      setStatus(task.status || "");
    }
  }, [task]);

  if (!isOpen) return null; // Return null if the modal is not open
  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-semibold mb-4">Update Task</h2>
          <div className="mb-3">
            <label htmlFor="updatedTitle" className="form-label">Title</label>
            <input
              type="text"
              className="form-control p-3 rounded-lg border-gray-300 shadow-sm w-full capitalize"
              id="updatedTitle"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              required
            />
          </div>
          {task.description && (
            <div className="mb-3">
              <label htmlFor="updatedDescription" className="form-label">Description</label>
              <textarea
                className="form-control p-3 rounded-lg border-gray-300 shadow-sm w-full"
                id="updatedDescription"
                rows="3"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
                required
              />
            </div>
          )}
          <div className="flex justify-between items-center">
            <button
              onClick={(e) => handleUpdate(e)}
              className="btn btn-primary py-2 px-6 rounded-full bg-blue-500 text-white hover:bg-blue-600"
            >
              Update
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default TaskUpdateModal;
