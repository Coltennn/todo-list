import React, { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [
      { id: 1, title: "Learn React Router 1", completed: false },
      { id: 2, title: "Learn smth", completed: false },
      { id: 3, title: "Eat", completed: false }
    ]
  );

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function todoCompleted(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function removeTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  function addTask(e) {
    if (e.code === "Enter" && input.trim() !== "") {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: Date.now(), title: input, completed: false }
      ]);
      setInput("");
    }
  }

  return (
    <div className="App">
      <h1>Todo App</h1>
      <input
        value={input}
        type="text"
        onKeyUpCapture={(e) => addTask(e)}
        onChange={(e) => setInput(e.target.value)}
      />
      <div>
        {tasks &&
          tasks.map((task) => (
            <div className="TaskWrapper" key={task.id}>
              <input
                type="checkbox"
                onClick={() => todoCompleted(task.id)}
                checked={task.completed}
              />
              <div
                className="taskTitle"
                style={{
                  textDecoration: task.completed ? "line-through" : null
                }}
              >
                {task.title}
              </div>
              <div onClick={() => removeTask(task.id)} className="close">
                &times;
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
