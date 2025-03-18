import { useState } from "react";
import { todos } from "../data/data";

export default function List() {
  const [checked, setChecked] = useState(todos);

  const handleCheckTodos = (id: number) => {
    setChecked((prevState) =>
      prevState.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="list-wrapper">
      <div className="todos">
        <h1>Things to do</h1>
        <ul>
          {checked.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCheckTodos(todo.id)}
              />
              {todo.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
