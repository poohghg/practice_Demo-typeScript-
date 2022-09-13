import { AutoBind } from "../utility/funcion";
import { DragTarget, Project, ProjectStatus } from "../types/types";
import Component from "./base-component";
import ProjectItem from "./project-item";
import { prjState } from "../state/project-state";

export default class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Project[] = [];
  private type: "active" | "finished";
  constructor(type: "active" | "finished") {
    super("app", "project-list", false, `${type}-projects`);
    this.type = type;
    this.configure();
    this.renderContent();
  }

  @AutoBind
  dragOverHandler(e: DragEvent) {
    if (e.dataTransfer && e.dataTransfer.types[0] === "text/plain") {
      // 자바스크립트에서 드랍이벤트는 디폴트로 막혀있다.
      e.preventDefault();
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }

  @AutoBind
  dragLeaveHandler(_: DragEvent) {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.toggle("droppable");
  }

  @AutoBind
  dropHandler(e: DragEvent) {
    const prjId = e.dataTransfer!.getData("text/plain");
    // console.log("prjId", prjId);
    prjState.moveProject(
      prjId,
      this.type === "active" ? ProjectStatus.active : ProjectStatus.finished,
    );
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`,
    )! as HTMLUListElement;
    listEl.innerHTML = "";
    this.assignedProjects.forEach((prj) => {
      new ProjectItem(this.element.querySelector("ul")!.id, prj);
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector(
      "h2",
    )!.textContent = `${this.type.toUpperCase()} PROJECT`;
  }

  configure() {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);
    prjState.addListener((projects: Project[]) => {
      this.assignedProjects = projects.filter(
        ({ status }) => ProjectStatus[status] === this.type,
      );
      this.renderProjects();
    });
  }
}
