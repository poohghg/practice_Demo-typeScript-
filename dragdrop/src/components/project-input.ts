import { prjState } from "../state/project-state";
import { InputValues } from "../types/types";
import { AutoBind, validationInput } from "../utility/funcion";
import Component from "./base-component";

export default class ProjectInput extends Component<
  HTMLDivElement,
  HTMLFormElement
> {
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
