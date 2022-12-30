import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  memo,
  SyntheticEvent,
} from "react";
import { Todos } from "../models/todo.model";
import { validationInput } from "../modules/functions";
interface NewTodoProps {
  setTodos: Dispatch<SetStateAction<Todos[]>>;
}

const NewTodo = ({ setTodos }: NewTodoProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const todoSubmitHandler = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
    const text = inputRef.current!.value;
    const isValid = validationInput({ value: text, required: true });
    // console.log();
    if (isValid) {
      // 함수로 넘기기
      setTodos((prev) => {
        const id = prev[prev.length - 1]?.id + 1 || 0;
        return [...prev, { id, text }];
      });
      inputRef.current!.value = "";
    } else {
      alert("텍스트를 입력해주세요");
      inputRef.current!.focus();
    }
  }, []);

  return (
    <form id="todo_form" onSubmit={todoSubmitHandler}>
      <div>
        <label htmlFor="todo-text"></label>
        <input ref={inputRef} type="text" id="todo-text" />
      </div>
      <button id="todo_form_Btn" type="submit">
        ADD TODO
      </button>
    </form>
  );
};

export default memo(NewTodo);
