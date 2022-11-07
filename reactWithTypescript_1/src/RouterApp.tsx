import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Todo from "./pages/Todo";

const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/todo" element={<Todo />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default RouterApp;
