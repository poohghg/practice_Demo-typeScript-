// import { validationInput } from "./utility/funcion";

import { validationInput } from "./utility/funcion";

function AutoBind(traget: any, name: string, desc: PropertyDescriptor) {
  const originalMethod = desc.value;
  // console.log("desc", desc);
  const abjDesc: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return abjDesc;
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

  private gatherUserInput() {
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
    console.log(datas);
  }

  @AutoBind
  private submitHandleer(e: Event) {
    e.preventDefault();
    this.gatherUserInput();
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandleer);
  }
}

const prjInput = new ProjectInput();
