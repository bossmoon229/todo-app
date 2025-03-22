import { useEffect, useState } from "react";
import { todos } from "../data/data";
import trash from "../../public/trash-svgrepo-com.svg";
import Button from "./Button";

export default function List() {
  const [checked, setChecked] = useState(todos);
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos !== null) {
      setChecked(JSON.parse(savedTodos));
    }
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme !== null) {
      setTheme(JSON.parse(savedTheme));
    }
  }, []);

  const handleCheckTodos = (id: number) => {
    setChecked((prevState) =>
      prevState.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    const updatedTodos = checked.filter((todo) => todo.id !== id);
    setChecked(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
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

    const updatedTodos = [...checked, newTodo];
    setChecked(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setNewTask("");
    setOpen(false);
  };

  const handleThemeChange = () => {
    const newTheme = !theme;
    setTheme(newTheme);
    localStorage.setItem("theme", JSON.stringify(newTheme));
  };

  return (
    <div className={`list-wrapper ${theme ? "dark-theme" : ""}`}>
      <div className="todos">
        <div className="theme-wrapper">
          <h1>Things to do</h1>
          <img
            className="trash-icon"
            onClick={handleThemeChange}
            src={theme ? "public/icons8-sun.svg" : "public/moon-line-icon.svg"}
            alt="theme-changer"
          />
        </div>
        <ul>
          {checked.length === 0 ? (
            <p>There's no notes</p>
          ) : (
            checked.map((todo) => (
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
            ))
          )}
        </ul>
        {open && (
          <>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter your task"
            />
            <Button onClick={handleAddTask}>Save</Button>
          </>
        )}
        {/* <button onClick={toggleInput}>{open ? "Cancel" : "Add task"}</button> */}
        <Button onClick={toggleInput}>{open ? "Cancel" : "Add task"}</Button>
      </div>
    </div>
  );
}
