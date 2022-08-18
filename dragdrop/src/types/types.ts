export enum ProjectStatus {
  active,
  finished,
}

export type Listener = (item: Project[]) => void;

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
