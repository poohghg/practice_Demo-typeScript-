import { BrowserRouter, Route, Routes } from "react-router-dom";
import Todo from "./pages/Todo";

// const paths = [
//   {path:}
// ];

const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={null}></Route>
        <Route path="/todo" element={<Todo />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default RouterApp;
