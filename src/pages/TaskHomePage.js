import React, { useEffect, useState } from "react";
import "../stylesheets/TasksHomePage.css";
import Task from "../components/Task";
import TaskEditModal from "../components/TaskEditModal";
import TaskDeleteModal from "../components/TaskDeleteModal";
import { 
  fetchTasksApi,
  addTaskApi,
  toggleTaskApi,
  editTaskApi,
  deleteTaskApi } from "../services/TasksApi";


const TaskHomePage = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);


  const handleFetchTasks = async () => {
    const data = await fetchTasksApi();
    setTasks(data);
  };

  const handleAddTask = async () => {
    const newTask = await addTaskApi(inputValue);
    if (newTask) {
      setTasks((prevTasks) => [newTask, ...prevTasks]);
      setInputValue("");
    }
  };

  const handleToggleTask = async (id) => {
    const updatedTask = await toggleTaskApi(id, !tasks.find((t) => t._id === id).completed);
    if (updatedTask) {
      setTasks((prevTasks) => prevTasks.map((t) => (t._id === id ? updatedTask : t)));
    }
  };

  const handleEditTask = async (id, newText) => {
    const updatedTask = await editTaskApi(id, newText);
    if (updatedTask) {
      setTasks((prevTasks) => prevTasks.map((t) => (t._id === id ? updatedTask : t)));
    }
  };

  const handleDeleteTask = async (id) => {
    const success = await deleteTaskApi(id);
    if (success) {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    }
  };

  const openEditModal = (task) => {
    setCurrentTask(task);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (task) => {
    setCurrentTask(task);
    setIsDeleteModalOpen(true);
  };

  const closeModals = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setCurrentTask(null);
  };

  useEffect(() => {
    handleFetchTasks();
  }, []);

  return (
    <div>
      <div className="page-title">
        <h1>TODO LIST</h1>
        {user ? (
          <p>Welcome, {user.name}!</p>
        ) : (
          <p>You are not logged in. Please log in first.</p>
        )}
      </div>

      {user && (
        <div className="input-n-list">
          <div className="input-n-btn">
            <input
              className="input-field"
              type="text"
              placeholder="add item..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className="btn btn-success"
              onClick={handleAddTask}
              type="submit"
            >
              Add
            </button>
          </div>

          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task._id}>
                <Task
                  user={user}
                  task={task}
                  toggleTask={handleToggleTask}
                  onEdit={() => openEditModal(task)}
                  onDelete={() => openDeleteModal(task)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      {isEditModalOpen && (
        <TaskEditModal
          user={user}
          task={currentTask}
          isOpen={isEditModalOpen}
          onClose={closeModals}
          onSave={handleEditTask}
        />
      )}

      {isDeleteModalOpen && (
        <TaskDeleteModal
          user={user}
          task={currentTask}
          isOpen={isDeleteModalOpen}
          onClose={closeModals}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
};

export default TaskHomePage;
