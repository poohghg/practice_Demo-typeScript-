import React, { useCallback, useState, useEffect } from "react";
import NewTodo from "./components/NewTodo";
import SearchTodo from "./components/SearchTodo";
import TodoList from "./components/TodoList";
import { Todos } from "./models/todo.model";

function App() {
  const [todos, setTodos] = useState<Todos[]>([]);
  const [searchedTodo, setSearchedTodo] = useState<Todos[]>([]);
  const removeTods = useCallback((pid: Number) => {
    setTodos((prev) => prev.filter(({ id }) => id !== pid));
  }, []);

  const removeAllTods = useCallback(() => {
    setTodos(() => []);
  }, []);

  const searchTodoHandler = useCallback(
    (value: { text: string }) => {
      const findText = todos.filter(
        ({ text }) => text.toLowerCase() === value.text.toLowerCase(),
      );
      setSearchedTodo(findText);
    },
    [todos],
  );

  useEffect(() => {
    return () => {
      setSearchedTodo([]);
    };
  }, [todos]);

  return (
    <div className="App">
      {todos.length !== 0 && (
        <>
          <SearchTodo searchTodoHandler={searchTodoHandler} />
          {searchedTodo.length !== 0 &&
            searchedTodo.map((value) => (
              <div key={value.id} className="flexBox">
                <h5 style={{ marginRight: "0.5rem" }}>{value.id}</h5>
                <h5>{value.text}</h5>
              </div>
            ))}
        </>
      )}
      {todos.length !== 0 && (
        <div className="flexBox">
          <h3>총 갯수: {todos.length}</h3>
          <button id="todo_remove_button" onClick={removeAllTods}>
            전체 삭제
          </button>
        </div>
      )}
      <NewTodo setTodos={setTodos} />
      <TodoList items={todos} removeTods={removeTods}>
        Todo List
      </TodoList>
    </div>
  );
}

export default App;
