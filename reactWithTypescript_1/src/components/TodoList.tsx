import React from "react";
import { text } from "stream/consumers";

interface TodoListProps {
  items: { id: Number; text: String }[];
}
// [].map(())
const TodoList: React.FC<TodoListProps> = ({ items }) => {
  return (
    <div>
      {items.map(({ id, text }) => (
        <li key={id.toString()}>{text}</li>
      ))}
    </div>
  );
};

export default TodoList;
