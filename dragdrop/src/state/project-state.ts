import {
  InputValues,
  Listener,
  Project,
  ProjectStatus,
} from "./../types/types";

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
export const prjState = ProjectState.getInstance();
