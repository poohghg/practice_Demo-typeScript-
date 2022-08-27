import { validationInput, AutoBind } from "./utility/funcion";
import { ProjectStatus, Listener, InputValues, Project } from "./types/types";

class State<T> {
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
}
const prjState = ProjectState.getInstance();

// 추상클래스로 인스턴스화를 막는다.
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  hostElement: T;
  templateElement: HTMLTemplateElement;
  element: U;

  constructor(
    hostElementId: string,
    templateId: string,
    insertAtStart: boolean,
    newElementId?: string,
  ) {
    this.hostElement = document.getElementById(hostElementId)! as T;
    this.templateElement = document.getElementById(
      templateId,
    )! as HTMLTemplateElement;
    const importedNode = document.importNode(
      this.templateElement.content,
      true,
    );
    this.element = importedNode.firstElementChild as U;
    if (newElementId) this.element.id = newElementId;
    this.attach(insertAtStart);
  }
  private attach(insertBeginning: boolean) {
    this.hostElement.insertAdjacentElement(
      insertBeginning ? "afterbegin" : "beforeend",
      this.element,
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}

class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  assignedProjects: Project[] = [];

  constructor(private type: "active" | "finished") {
    super("app", "project-list", false, `${type}-projects`);
    this.configure();
    this.renderContent();
  }

  private renderProjects() {
    const listEL = document.getElementById(
      `${this.type}-projects-list`,
    )! as HTMLUListElement;
    const listItme = document.createElement("li");
    listItme!.id = `${this.type}-projects-list`;
    this.assignedProjects.forEach(({ id, title }) => {
      if (!document.getElementById(`${this.type}-projects-list-${id}`)) {
        const listItme = document.createElement("li");
        listItme!.id = `${this.type}-projects-list-${id}`;
        listItme.textContent = title;
        listEL.append(listItme);
      }
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
