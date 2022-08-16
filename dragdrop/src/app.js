var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
function AutoBind(traget, name, desc) {
  var originalMethod = desc.value;
  console.log("originalMethod", originalMethod);
  var abjDesc = {
    configurable: true,
    get: function () {
      var boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return abjDesc;
}
// Code goes here!
var ProjectInput = /** @class */ (function () {
  function ProjectInput() {
    this.hostElement = document.getElementById("app");
    this.templateElement = document.getElementById("project-input");
    var importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild;
    this.element.id = "user-input";
    this.titleInputEL = this.element.querySelector("#title");
    this.descInputEL = this.element.querySelector("#description");
    this.peopleInputEL = this.element.querySelector("#people");
    // 실행함수
    this.attach();
    this.configure();
  }
  ProjectInput.prototype.attach = function () {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  };
  ProjectInput.prototype.submitHandleer = function (e) {
    console.log("this", this);
    e.preventDefault();
  };
  ProjectInput.prototype.configure = function () {
    this.element.addEventListener("submit", this.submitHandleer);
  };
  __decorate([AutoBind], ProjectInput.prototype, "submitHandleer");
  return ProjectInput;
})();
var prjInput = new ProjectInput();
