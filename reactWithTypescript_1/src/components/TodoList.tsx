import React, { FC } from "react";

interface TodoListProps {
  items: { id: Number; text: String }[];
  removeTods: (pid: Number) => void;
}

const TodoList: FC<TodoListProps> = ({ items, removeTods }) => {
  return (
    <div>
      {items.map(({ id, text }) => (
        <li key={id.toString()} id="todo-item">
          <span>{id.toString()}</span>
          <span> {text}</span>
          {/* <button onClick={removeTods.bind(null, id)}>삭제</button> */}
          <button onClick={() => removeTods(id)}>삭제</button>
        </li>
      ))}
      1
    </div>
  );
};

export default TodoList;
