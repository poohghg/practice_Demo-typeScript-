import React from "react";
import BaseForm from "./BaseForm";

interface SearchTodoProps {
  searchTodoHandler: (value: { text: string }) => void;
}

const SearchTodo = ({ searchTodoHandler }: SearchTodoProps) => {
  return (
    <BaseForm
      actionFunction={searchTodoHandler}
      refArr={[
        { id: "search_text", type: "text", label: "Todo 검색", name: "text" },
        // { id: "search_text_1", type: "text", label: "Todo 검색" },
      ]}
    />
  );
};

export default SearchTodo;
