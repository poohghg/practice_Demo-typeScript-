// 추상클래스로 인스턴스화를 막는다.
// default - 메인
export default abstract class Component<
  T extends HTMLElement,
  U extends HTMLElement,
> {
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
