import React from "react";
import BaseForm from "./BaseForm";

const SearchTodo = () => {
  const submitHandler = () => {};

  return (
    <BaseForm
      submitHandler={() => {}}
      refArr={[{ id: "search_text", type: "text", label: "텍스트 검색" }]}
    />
  );
};

export default SearchTodo;
