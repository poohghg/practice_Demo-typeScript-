import Component from "./abstractClass/component";
import {
  ProjectStatus,
  Listener,
  InputValues,
  Project,
  Draggable,
  DragTarget,
} from "./types/types";

import { validationInput, AutoBind } from "./utility/funcion";

abstract class State<T> {
  protected listeners: Listener<T>[] = [];
  addListener(listeneFn: Listener<T>) {
    this.listeners.push(listeneFn);
  }
}

class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;
  private static id: number = 0;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) return this.instance;
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(inputValues: InputValues) {
    const id = ProjectState.id++;
    this.projects.push({
      id: id.toString(),
      ...inputValues,
      status: ProjectStatus.active,
    });

    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }

  moveProject(pid: string, newStatus: ProjectStatus) {
    const project = this.projects.find(({ id }) => id === pid);
    if (project && project.status !== newStatus) project.status = newStatus;
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}
const prjState = ProjectState.getInstance();

class ProjectItem
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

class ProjectList
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
// Code goes here!
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputEL: HTMLInputElement;
  descInputEL: HTMLInputElement;
  peopleInputEL: HTMLInputElement;

  constructor() {
    super("app", "project-input", true, "user-input");
    this.titleInputEL = this.element.querySelector(
      "#title",
    )! as HTMLInputElement;
    this.descInputEL = this.element.querySelector(
      "#description",
    )! as HTMLInputElement;
    this.peopleInputEL = this.element.querySelector(
      "#people",
    )! as HTMLInputElement;

    this.configure();
  }

  private gatherUserInput(): InputValues | void {
    const titleValue = this.titleInputEL.value;
    const descValue = this.descInputEL.value;
    const peopelValue: number = +this.peopleInputEL.value;

    const isValidTitle = validationInput({
      value: titleValue,
      required: true,
      maxLen: 50,
    });
    if (isValidTitle !== true) {
      this.titleInputEL.focus();
      alert("제목을 입력해주세요");
      return;
    }
    const isValidDesc = validationInput({
      value: descValue,
      required: true,
      maxLen: 1000,
    });
    if (isValidDesc !== true) {
      this.descInputEL.focus();
      alert("내용을 입력해주세요");
      return;
    }
    const isValidPeopel = validationInput({
      value: peopelValue,
      required: true,
      max: 10,
    });
    if (isValidPeopel !== true) {
      this.peopleInputEL.focus();
      alert("사람의수를 입력해주세요");
      return;
    }
    const datas = {
      title: titleValue,
      desc: descValue,
      peopel: +peopelValue,
    };
    return datas;
  }

  private clearInputs() {
    this.titleInputEL.value = "";
    this.descInputEL.value = "";
    this.peopleInputEL.value = "";
  }

  @AutoBind
  private submitHandleer(e: Event) {
    e.preventDefault();
    const datas = this.gatherUserInput();
    if (typeof datas === "object") {
      prjState.addProject(datas);
      this.clearInputs();
    }
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandleer);
  }
  renderContent() {}
}

const prjInput = new ProjectInput();
const prjList1 = new ProjectList("active");
const prjList2 = new ProjectList("finished");
// console.log(prjState);
