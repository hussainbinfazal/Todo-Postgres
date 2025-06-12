import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  createTodo,
  updateTodo,
  getTodos,
  deleteTodo,
  completed,
} from "../redux/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState,useCallback } from "react";
import Quotes from "./Quotes";
import TaskUpdateModal from "./TaskUpdateModal";
import { Toast } from "bootstrap";
import { ToastContainer, toast } from "react-toastify";
import ViewTask from "./ViewTask";
import { axiosInstance } from "../lib/axios";

const Todo = () => {
  const { todos } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [todosFetched, setTodosFetched] = useState(false);
  const [work, setWork] = useState("");
  const [description, setDescription] = useState("");
  const [isDescription, setisDescription] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); // State to manage the selected task
  const [isModalOpen, setIsModalOpen] = useState(false); // State to toggle the modal
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewSelectedTask, setViewSelectedTask] = useState(null);

  const handleViewTask = (todo) => {
    setViewSelectedTask(todo);
    setIsViewModalOpen(true);
     // Close update modal when view modal opens
    
  };
  const handleCloseViewModal = useCallback(() => {
    setIsViewModalOpen(false); // Close the modal
    setViewSelectedTask(null);  // Clear the selected task
  }, []);
const handleUpdateModal = (todo)=>{
  setSelectedTask(todo)
  setIsModalOpen(true)

}
  const handleSubmit = (e) => {
    e.preventDefault();
    if (work) {
      if (isDescription) {
        let todoData = {
          title: work,
          description: description,
          status: "pending",
        };
        handleCreateTodo(todoData);
      } else {
        let todoData = { title: work, status: "pending" };
        handleCreateTodo(todoData);
      }
    }
    setWork("");
    setDescription("");
  };

  const handleCreateTodo = async (todoData) => {
    try {
      let response = await axios.post(
        "http://localhost:5000/api/todo",
        todoData,
        { withCredentials: true }
      );
      dispatch(createTodo(response.data.todo));
      toast.success("Todo Added Successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      handleGetTodos();
    } catch (error) {
      if (error.response && error.response.data) {
        // Log the exact error message sent by backend
        toast.error(error.response.data.message || "Error creating todo", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    } else {
        // General error if no response data is available
        toast.error(error.response.data.message || "Error creating todo", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    }
  };

  const handleUpdateTodo = async (id, todoData) => {
    try {
      let response = await axios.put(`http://localhost:5000/api/todo/${id}`, todoData,{ withCredentials: true });
      dispatch(updateTodo(response.data));
      toast.success("Todo Updated Successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsModalOpen(false);
      handleGetTodos();
    } catch (error) {
      toast.error("Error updating todo!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleGetTodos = async () => {
    try {
      let response = await axios.get("http://localhost:5000/api/todo", { withCredentials: true });
      dispatch(getTodos(response.data));
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      let response = await axiosInstance.delete(
        `/api/todo/${todoId}`,
        { withCredentials: true }
      );

      dispatch(deleteTodo(response.data));
      toast.success("Todo Deleted Successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      handleGetTodos();
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
      
    }
  };

  const handleChangeTodo = async (todoId, status) => {
    try {
      
      const todo = todos.find((todo) => todo.todo_id === todoId);
      const newStatus = todo.status === "completed" ? "pending" : "completed";
      
      const response = await axios.put(
        `http://localhost:5000/api/todo/status/${todoId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      if (newStatus === "completed") {
        toast.success("🎉 Task completed hurray! 🎊", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.info("📝 Task marked as pending... 🕒", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      dispatch(completed(response.data));
      setTimeout(() => {
        handleGetTodos();
      }, 100);
    } catch (error) {
      toast.error("Error updating todo status:", error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
    }
  };

  useEffect(() => {
    handleGetTodos();
  }, []);
  
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="max-w-4xl w-full space-y-10">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Quotes />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="Task"
                className="form-label font-semibold text-lg"
              >
                Task
              </label>
              <input
                type="text"
                className="form-control p-3 rounded-lg border-gray-300 shadow-sm w-full capitalize"
                id="work"
                placeholder="Enter your task"
                value={work}
                onChange={(e) => setWork(e.target.value)}
                required
                maxLength={50}
              />
              <span className="text-gray-500 text-sm flex justify-end">
                <span
                  className={`${
                    work.length >= 51 ? "text-red-500" : "text-gray-500"
                  }`}
                >
                  {work.length}/50
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2 my-4">
              <input
                type="checkbox"
                name="taskDescription"
                id="description"
                onChange={(e) => setisDescription(e.target.checked)}
                className="mr-2"
              />
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-600"
              >
                Add task Description
              </label>
            </div>
            {isDescription && (
              <div className="mb-3">
                <label
                  htmlFor="description"
                  className="form-label font-semibold text-lg"
                >
                  Description
                </label>
                <textarea
                  className="form-control p-3 rounded-lg border-gray-300 shadow-sm w-full"
                  id="description"
                  rows="3"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  maxLength={100}
                />
                <span className="text-gray-500 text-sm flex justify-end">
                  <span
                    className={`text-${
                      description.length >= 101 ? "red" : "gray"
                    }-500`}
                  >
                    {description.length}/100
                  </span>
                </span>
              </div>
            )}
            <button
              type="submit"
              className="btn btn-primary py-2 px-6 rounded-full bg-blue-500 text-white hover:bg-blue-600"
            >
              Create Task
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 ">
          {todos.length > 0 ? (
            Array.isArray(todos) &&
            [...todos]
            .sort((a, b) => {
              // First, sort by completion status
              if (a.status !== b.status) {
                return a.status === "completed" ? 1 : -1;
              }
              
              // If both tasks have same status, sort by time (newest first)
              const timeA = new Date(a.updated_at || a.created_at).getTime();
              const timeB = new Date(b.updated_at || b.created_at).getTime();
              return timeB - timeA;
            })  
              .map((todo) => (
                <div
                  key={todo.todo_id}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-x-hidden relative"
                >
                  <div className="flex justify-between items-start overflow-hidden">
                    <input
                      type="checkbox"
                      name="completed"
                      checked={todo.status === "completed"}
                      onChange={() => handleChangeTodo(todo.todo_id)}
                      className={`h-5 w-5 cursor-pointer appearance-none rounded-full outline-none border-2
                        ${
                          todo.status === "completed"
                            ? "bg-blue-500 border-blue-500"
                            : "bg-white border-gray-300"
                        }
                        focus:outline-none  focus:ring-blue-500 checked:bg-blue-500 checked:border-blue-500 transition-all checked:shadow-md checked:shadow-blue-500/50`}
                    />
                    <div className="space-x-2 flex items-center justify-between">
                      <button
                        type="button"
                        className="pr-3   text-gray-500 hover:text-gray-700 cursor-pointer text-sm"
                        onClick={() => handleViewTask(todo)}
                      >
                        {isViewModalOpen ? (
                          <FaEyeSlash
                            size={20}
                            className="text-gray-500 hover:text-gray-700 transition duration-300 cursor-pointer"
                          />
                        ) : (
                          <FaEye
                            size={20}
                            className="text-gray-500 hover:text-gray-700 transition duration-300 cursor-pointer"
                          />
                        )}
                      </button>
                      <button
                        onClick={() => handleUpdateModal(todo)}
                        className="text-sm text-blue-600 hover:text-blue-700 pr-3"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteTodo(todo.todo_id)}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <h5
                    className={`text-xl font-semibold mt-4 text-gray-800 ${
                      todo.status === "completed" ? "line-through" : ""
                    } capitalize truncate `}
                  >
                    {todo.title}
                  </h5>
                  <p className="text-gray-600 mt-2 truncate">
                    {todo.description}
                  </p>
                  {/* <p className="text-sm text-gray-500 mt-2">
                    <small>Status: {todo.status}</small>
                  </p> */}
                  <div className=" w-full h-auto flex justify-between items-center py-auto mt-10 ">
                  
                    <p className="text-gray-500  text-[9px] absolute bottom-0 left-5">
                      {todo.updated_at && todo.updated_at !== todo.created_at
                        ? `Edited on: ${new Date(
                            todo.updated_at
                          ).toLocaleString()}`
                        : `Created at: ${new Date(
                            todo.created_at
                          ).toLocaleString()}`}
                    </p>
                    <p className={`text-sm  mt-2 absolute bottom-5 left-5 ${todo.status === "completed" ? "text-blue-600" : "text-red-500"}`}>
                    <small >Status: {todo.status}</small>
                  </p>
                  </div>
                </div>
              ))
          ) : (
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                No Task Found
              </h1>
              <p className="text-gray-600">Please add a task</p>
            </div>
          )}
        </div>
      </div>

      <TaskUpdateModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdate={handleUpdateTodo}
      />

      <ViewTask
        task={viewSelectedTask}
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
      />
      
    </div>
  );
};

export default Todo;

