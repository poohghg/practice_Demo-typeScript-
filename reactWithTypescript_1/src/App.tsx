import React, { useCallback, useState } from "react";
import NewTodo from "./components/NewTodo";
import TodoList from "./components/TodoList";
import { Todos } from "./models/todo.model";

function App() {
  const [todos, setTodos] = useState<Todos[]>([]);

  const removeTods = useCallback((pid: Number) => {
    setTodos((prev) => prev.filter(({ id }) => id !== pid));
  }, []);

  const removeAllTods = useCallback(() => {
    setTodos(() => []);
  }, []);

  return (
    <div className="App">
      <NewTodo setTodos={setTodos} />
      <div className="flexBox">
        <h3>{todos.length}</h3>
        <button id="todo_remove_button" onClick={removeAllTods}>
          전체 삭제
        </button>
      </div>
      <TodoList items={todos} removeTods={removeTods} />
    </div>
  );
}

export default App;
