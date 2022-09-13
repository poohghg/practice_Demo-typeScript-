import { AutoBind } from "../utility/funcion";
import { Draggable, Project } from "../types/types";
import Component from "./base-component";

export default class ProjectItem
  extends Component<HTMLUListElement, HTMLElement>
  implements Draggable
{
  private project: Project;
  constructor(hostId: string, project: Project) {
    super(hostId, "single-project", false, project.id);
    this.project = project;
    this.renderContent();
    this.configure();
  }

  @AutoBind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  @AutoBind
  dragEndHandler(event: DragEvent) {}

  configure(): void {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent(): void {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent =
      this.project.peopel.toString() + "명";
    this.element.querySelector("p")!.textContent = this.project.desc;
  }
}
