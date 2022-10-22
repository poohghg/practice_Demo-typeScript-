import React, { useCallback, useMemo } from "react";
import NewTodo from "./components/NewTodo";
import TodoList from "./components/TodoList";

function App() {
  const todos = [{ id: 1, text: "test1" }];

  const todosLen = useMemo(() => todos.length, [todos]);
  const todoSubmitHandler = useCallback((e: React.FormEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div className="App">
      <NewTodo />
      <TodoList items={todos} />
      <div>{todosLen}</div>
    </div>
  );
}

export default App;
