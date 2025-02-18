
import React, { useState } from 'react';

function Home() {
  const [task, setTask] = useState(''); // Input field value
  const [tasks, setTasks] = useState({ todo: [], ongoing: [], completed: [] }); // Task categories

  // Handle input change
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  // Add task to "To-Do" section
  const addTask = () => {
    if (task.trim() !== '') {
      setTasks((prevTasks) => ({
        ...prevTasks,
        todo: [...prevTasks.todo, task],
      }));
      setTask(''); // Clear input
    }
  };

  // Move task to another category
  const moveTask = (currentCategory, targetCategory, taskToMove) => {
    setTasks((prevTasks) => {
      // Remove task from current category
      const updatedCurrent = prevTasks[currentCategory].filter(
        (t) => t !== taskToMove
      );
      // Add task to target category
      const updatedTarget = [...prevTasks[targetCategory], taskToMove];
      return { ...prevTasks, [currentCategory]: updatedCurrent, [targetCategory]: updatedTarget };
    });
  };

  return (
    <div className="home">
      <h1 className="prname">Task-Buddy App</h1>
      <form
        className="task-form"
        onSubmit={(e) => {
          e.preventDefault(); // Prevent form reload
          addTask();
        }}
      >
        <input
          type="text"
          placeholder="Enter task..."
          className="task-input" 
          value={task}
          onChange={handleInputChange}
        />
        <button
          type="button"
          className="add-task-button"
          onClick={addTask}
        >
          ADD TASK
        </button>
      </form>
      <div className="task-sections">
        {/* To-Do Section */}
        <div className="task-section">
          <h2 className="red">To-Do Tasks</h2>
          <ul className="ul1">
            {tasks.todo.map((t, index) => (
              <li key={index} className="list">
                {t}
                <button
                  onClick={() => moveTask('todo', 'ongoing', t)}
                className="mid">
                  Move to Ongoing
                </button>
                <button
                  onClick={() => moveTask('todo', 'completed', t)}
                className="last">
                  Move to Completed
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Ongoing Section */}
        <div className="task-section">
          <h2 className="blue">Ongoing Tasks</h2>
          <ul className="ul2">
            {tasks.ongoing.map((t, index) => (
              <li key={index} className="list">
                {t}
                <button
                  onClick={() => moveTask('ongoing', 'todo', t)}
                className="first">
                  Move to To-Do
                </button>
                <button
                  onClick={() => moveTask('ongoing', 'completed', t)}
                className="last">
                  Move to Completed
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Completed Section */}
        <div className="task-section">
          <h2 className="green">Completed Tasks</h2>
          <ul className="ul3">
            {tasks.completed.map((t, index) => (
              <li key={index} className="list">
                {t}
                <button
                  onClick={() => moveTask('completed', 'todo', t)}
                className="first">
                  Move to To-Do
                </button>
                <button
                  onClick={() => moveTask('completed', 'ongoing', t)}
                className="mid">
                  Move to Ongoing
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;




