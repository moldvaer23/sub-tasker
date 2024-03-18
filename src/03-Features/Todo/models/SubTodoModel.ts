import { v4 as uuidv4 } from "uuid";

import type { ISubTodoModel, TSubTodoModelProps } from "./type";

class SubTodoModel implements ISubTodoModel {
  public uuid: string;
  public uuidPinTodo: string;
  public task: string;

  constructor(props: TSubTodoModelProps) {
    this.uuid = props.uuid ? props.uuid : uuidv4();
    this.uuidPinTodo = props.uuidPinTodo;
    this.task = props.task;
  }
}

export default SubTodoModel;
