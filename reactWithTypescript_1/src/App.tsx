import React, { useCallback } from "react";
import NewTodo from "./components/NewTodo";
import TodoList from "./components/TodoList";

function App() {
  const todos = [{ id: 1, text: "test1" }];
  const todoSubmitHandler = useCallback((e: React.FormEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div className="App">
      <NewTodo />
      <TodoList items={todos} />
    </div>
  );
}

export default App;
