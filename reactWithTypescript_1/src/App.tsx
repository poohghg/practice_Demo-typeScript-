import { log } from "console";
import React, { useCallback, useState } from "react";
import NewTodo from "./components/NewTodo";
import SearchTodo from "./components/SearchTodo";
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

  const searchTodo = useCallback(
    (pText: String) => {
      const findText = todos.filter(
        ({ text }) => text.toLowerCase === pText.toLowerCase,
      );
    },
    [todos],
  );

  return (
    <div className="App">
      <NewTodo setTodos={setTodos} />
      {todos.length !== 0 && (
        <div className="flexBox">
          <h3>총 갯수: {todos.length}</h3>
          <button id="todo_remove_button" onClick={removeAllTods}>
            전체 삭제
          </button>
        </div>
      )}
      <TodoList items={todos} removeTods={removeTods}>
        <h4>Todo List</h4>
      </TodoList>
      <SearchTodo />
    </div>
  );
}

export default App;
