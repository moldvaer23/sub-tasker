import type { ITodoModel, TTodoModelProps } from "./type";

class TodoModel implements ITodoModel {
  public id: number;
  public task: string;

  constructor(props: TTodoModelProps) {
    this.id = props.id;
    this.task = props.task;
  }
}

export default TodoModel;
