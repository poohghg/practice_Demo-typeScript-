import React, { Dispatch, SetStateAction } from "react";

interface TodoListProps {
  items: { id: Number; text: String }[];
  removeTods(pid: Number): void;
  // setTodos: Dispatch<SetStateAction<Todos[]>>;
}

const TodoList: React.FC<TodoListProps> = ({ items, removeTods }) => {
  return (
    <div>
      {items.map(({ id, text }) => (
        <li id="todo-item" key={id.toString()}>
          <span>{id.toString()}</span>
          <span> {text}</span>
          <button onClick={() => removeTods(id)}>삭제</button>
        </li>
      ))}
    </div>
  );
};

export default TodoList;
