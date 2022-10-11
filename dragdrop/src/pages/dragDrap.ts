import "../css/project.css";
import ProjectInput from "../components/project-input";
import ProjectList from "../components/project-list";

const drageDrop = () => {
  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");
  // return {};
};
export default drageDrop;
