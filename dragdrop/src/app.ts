import { validationInput, AutoBind } from "./utility/funcion";
import { ProjectStatus, Listener, InputValues, Project } from "./types/types";
class ProjectState {
  private listeners: Listener[] = [];
  private projects: Project[] = [];
  private static instance: ProjectState;
  private static id: number = 0;

  private constructor() {}

  static getInstance() {
    if (this.instance) return this.instance;
    this.instance = new ProjectState();
    return this.instance;
  }

  addListener(listeneFn: Listener) {
    this.listeners.push(listeneFn);
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
}
const prjState = ProjectState.getInstance();
class ProjectList {
  hostElement: HTMLDivElement;
  templateElement: HTMLTemplateElement;
  element: HTMLElement;
  assignedProjects: Project[] = [];

  constructor(private type: "active" | "finished") {
    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    this.templateElement = document.getElementById(
      "project-list",
    )! as HTMLTemplateElement;
    const importedNode = document.importNode(
      this.templateElement.content,
      true,
    );
    this.element = importedNode.firstElementChild! as HTMLElement;
    this.element.id = `${this.type}-projects`;

    prjState.addListener((projects: Project[]) => {
      this.assignedProjects = projects.filter(
        ({ status }) => ProjectStatus[status] === this.type,
      );
      this.renderProjects();
    });

    this.attach();
    this.renderContent();
  }

  private renderProjects() {
    const listEL = document.getElementById(
      `${this.type}-projects-list`,
    )! as HTMLUListElement;
    if (this.assignedProjects.length) {
      const listItme = document.createElement("li");
      const lastPrj = this.assignedProjects[this.assignedProjects.length - 1];
      listItme.textContent = lastPrj.title;
      listEL.append(listItme);
    }
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector(
      "h2",
    )!.textContent = `${this.type.toUpperCase()} PROJECT`;
  }

  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.element);
  }
}
// Code goes here!
class ProjectInput {
  hostElement: HTMLDivElement;
  templateElement: HTMLTemplateElement;
  element: HTMLFormElement;
  titleInputEL: HTMLInputElement;
  descInputEL: HTMLInputElement;
  peopleInputEL: HTMLInputElement;

  constructor() {
    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    this.templateElement = document.getElementById(
      "project-input",
    )! as HTMLTemplateElement;
    const importedNode = document.importNode(
      this.templateElement.content,
      true,
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";

    this.titleInputEL = this.element.querySelector(
      "#title",
    )! as HTMLInputElement;
    this.descInputEL = this.element.querySelector(
      "#description",
    )! as HTMLInputElement;
    this.peopleInputEL = this.element.querySelector(
      "#people",
    )! as HTMLInputElement;

    // 실행함수
    this.attach();
    this.configure();
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
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

  private configure() {
    this.element.addEventListener("submit", this.submitHandleer);
  }
}

const prjInput = new ProjectInput();
const prjList1 = new ProjectList("active");
const prjList2 = new ProjectList("finished");
// console.log(prjState);
