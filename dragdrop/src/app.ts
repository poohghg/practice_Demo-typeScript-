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
    ) as HTMLInputElement;
    this.descInputEL = this.element.querySelector(
      "#description",
    ) as HTMLInputElement;
    this.peopleInputEL = this.element.querySelector(
      "#people",
    ) as HTMLInputElement;

    // 실행함수
    this.attach();
    this.configure();
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }

  private validationEl(el: HTMLInputElement) {
    if (!el.value) {
      alert(`${el.name}은 필수 입력값이다.`);
      el.focus();
    }
    return el.value.trim();
  }

  private gatherUserInput() {
    const titleValue = this.validationEl(this.titleInputEL);
    // const titleValue = this.titleInputEL.value;
    // const descValue = this.descInputEL.value;
    // const peopelValue = this.peopleInputEL.value;
    // if (!titleValue || !descValue || !peopelValue) alert("필수 입력값입니다.");
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
