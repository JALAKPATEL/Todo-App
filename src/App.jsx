import React, { useState, useEffect } from "react";
import "./Todo.css";
import { AiFillDelete } from "react-icons/ai"; // Importing the delete icon
import { FaEdit } from "react-icons/fa";   // Importing the edit icon

const App = () => {
  const [task, setTask] = useState(""); 
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);  // Track which task is being edited
  const [currentDateTime, setCurrentDateTime] = useState("");

  // Function to get the current date and time
  const updateDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const time = now.toLocaleTimeString("en-US");
    setCurrentDateTime(`${date} | ${time}`);
  };

  // Use useEffect to update date and time every second
  useEffect(() => {
    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    if (task.trim()) {
      if (editIndex !== null) {
        // Update existing task if editing
        const updatedTasks = tasks.map((t, index) =>
          index === editIndex ? task : t
        );
        setTasks(updatedTasks);
        setEditIndex(null);
      } else {
        // Add new task
        setTasks([...tasks, task]);
      }
      setTask("");
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const editTask = (index) => {
    setTask(tasks[index]);
    setEditIndex(index); // Set the task to edit
  };

  return (
    <section className="todo-container">
      <header>
        <h1>Todo App</h1>
        <div className="date-time">{currentDateTime}</div> {/* Display current date and time */}
      </header>
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="todo-input"
        />
        <button type="submit" className="add-button">
          {editIndex !== null ? "Update Task" : "Add Task"}
        </button>
      </form>
      <ul className="task-list">
        {tasks.map((t, index) => (
          <li key={index} className="task-item">
            <span>{t}</span>
            <div>
              <FaEdit
                className="edit-icon"
                onClick={() => editTask(index)} // Trigger edit function
              />
              <AiFillDelete
                className="delete-icon"
                onClick={() => deleteTask(index)} // Trigger delete function
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default App;
