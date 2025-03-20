import { useState } from "react";
import { todos } from "../data/data";
import trash from "../../public/trash-svgrepo-com.svg";

export default function List() {
  const [checked, setChecked] = useState(todos);
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState("");

  const handleCheckTodos = (id: number) => {
    setChecked((prevState) =>
      prevState.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setChecked((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleInput = () => {
    setOpen(!open);
  };

  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    const newTodo = {
      id: checked.length + 1,
      text: newTask,
      completed: false,
    };
    
    setChecked((prev) => [...prev, newTodo]);
    setNewTask("");
    setOpen(false);
    console.log(todos);
    
  };

  return (
    <div className="list-wrapper">
      <div className="todos">
        <h1>Things to do</h1>
        <ul>
          {checked.map((todo) => (
            <li key={todo.id} className={todo.completed ? "completed" : ""}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCheckTodos(todo.id)}
              />
              {todo.text}
              <img
                className="trash-icon"
                onClick={() => handleDelete(todo.id)}
                src={trash}
                alt=""
              />
            </li>
          ))}
        </ul>
        {open && (
          <>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter your task"
            />
            <button onClick={handleAddTask}>Save</button>
          </>
        )}
        <button onClick={toggleInput}>{open ? "Cancel" : "Add task"}</button>
      </div>
    </div>
  );
}
