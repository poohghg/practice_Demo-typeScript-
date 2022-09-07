export enum ProjectStatus {
  active,
  finished,
}

export type Listener<T> = (item: T[]) => void;

export interface InputValues {
  title: string;
  desc: string;
  peopel: number;
}

export class Project {
  constructor(
    public id: string,
    public title: string,
    public desc: string,
    public peopel: number,
    public status: ProjectStatus,
  ) {
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.peopel = peopel;
    this.status = status;
  }
}

export interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

export interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}
