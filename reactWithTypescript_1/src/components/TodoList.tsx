import React, { FC, ReactNode } from "react";

interface TodoListProps {
  items: { id: Number; text: String }[];
  removeTods: (pid: Number) => void;
  children: ReactNode;
}

const TodoList: FC<TodoListProps> = ({ children, items, removeTods }) => {
  if (items.length === 0) return null;
  return (
    <div>
      <h4 id="todoLabel">{children}</h4>
      <ul id="todoList">
        {items.map(({ id, text }) => (
          <li key={id.toString()} id="todo-item">
            <span>{id.toString()}</span>
            <span> {text}</span>
            {/* <button onClick={removeTods.bind(null, id)}>삭제</button> */}
            <button onClick={() => removeTods(id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// TodoList.
export default TodoList;
