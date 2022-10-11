import { navigate, Routerable } from "./../Router";
export default class Header {
  $hostElement: HTMLDivElement;
  $target: HTMLElement;
  routerList: Routerable[];

  constructor(routerList: Routerable[], hostElementId: string = "app") {
    this.$hostElement = document.getElementById(
      hostElementId,
    )! as HTMLDivElement;
    this.$target = document.createElement("nav");
    this.$target.className = "navbar";

    this.routerList = routerList;

    this.$hostElement.insertAdjacentElement("afterbegin", this.$target);
    this.render();
  }
  render() {
    const innerHTML = `
      <div class="logo_box">
        <button>KHG</button>
      </div>
      <ul class="navbar_menu" id="ttttt">
      </ul>
      <a href="#" class="toggleBtn"><i class="fas fa-bars"></i></a>
  `;
    this.$target.innerHTML = innerHTML;
    this.routerList.forEach((pathInfo: Routerable) => {
      new HeaderButton(pathInfo);
    });
  }
}

class HeaderButton {
  $hostElement: HTMLLIElement;
  $target: HTMLLIElement;
  state: Routerable;

  constructor(pathInfo: Routerable, isActive: boolean = false) {
    this.$hostElement = document.querySelector(
      ".navbar_menu",
    )! as HTMLLIElement;
    this.$target = document.createElement("li");
    this.$target.className = "navbar_project";
    this.state = pathInfo;

    this.$hostElement.appendChild(this.$target);
    this.render();
    this.$target
      .querySelector("button")!
      .addEventListener("click", (e) => navigate(e, this.state.path));
  }
  render() {
    this.$target.innerHTML = `
        ${`<button>${this.state.name}</button>`}
    `;
  }
}
