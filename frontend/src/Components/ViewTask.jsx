import React, { useContext } from "react";
import { useEffect, useState, useRef } from "react";

const ViewTask = ({ task, isOpen, onClose }) => {
  const [viewTask, setViewTask] = useState(task?.title);
  const [viewDescription, setViewDescription] = useState(task?.description);
  const [viewStatus, setViewStatus] = useState(task?.status);

  const modalRef = useRef(null);
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;

    const handleClickOutside = (event) => {
      if (modalRef.current) {
        onClose();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    setTimeout(() => {
      if (isOpen && mounted.current) {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("click", handleClickOutside);
      }
    }, 100);
    return () => {
      mounted.current = false;
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, onClose, task]);

  useEffect(() => {
    if (task) {
      setViewTask(task.title);
      setViewDescription(task.description);
      setViewStatus(task.status);
    }
  }, [task]);
  return (
    isOpen && (
      <div
        className="view-Modal fixed inset-0  bg-opacity-50 flex justify-center items-center z-50 bg-white"
        ref={modalRef}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-semibold mb-4">Task</h2>
          <div className="mb-3">
            <label htmlFor="viewTitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control p-3 rounded-lg border-gray-300 shadow-sm w-full capitalize break-words"
              id="updatedTitle"
              value={viewTask}
              disabled
            />
          </div>
          {task?.description && (
            <div className="mb-3">
              <label htmlFor="updatedDescription" className="form-label">
                Description
              </label>
              <textarea
                className="form-control p-3 rounded-lg border-gray-300 shadow-sm w-full"
                id="updatedDescription"
                rows="3"
                value={viewDescription}
                disabled
              />
            </div>
          )}
          <p className="text-sm text-gray-500 mt-2">
            <small>Status: {viewStatus}</small>
          </p>
          <div className="w-full h-auto flex justify-between items-center py-auto mt-10">
            <p className="text-gray-500  text-[9px]">
              Created at: {new Date(task?.created_at).toLocaleString()}
            </p>
            <p className="text-gray-500 text-[9px]">
              Updated at: {new Date(task?.updated_at).toLocaleString()}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ViewTask;
