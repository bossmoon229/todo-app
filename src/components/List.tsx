import { todos } from "../data/data";

export default function List() {
  return (
    <div className="list-wrapper">
      <div className="todos">
        <h1>Things to do</h1>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input type="checkbox" />
              {todo.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
