import { v4 as uuidv4 } from "uuid";

import SubTodoModel from "./SubTodoModel";
import type { IMainTodoModel, ISubTodoModel, TMainTodoModelProps, TPushSubTodoProps } from "./type";

class MainTodoModel implements IMainTodoModel {
  public uuid: string;
  public task: string;
  public subTodos: Record<string, ISubTodoModel> = {};

  constructor(props: TMainTodoModelProps) {
    this.uuid = props.uuid ? props.uuid : uuidv4();
    this.task = props.task;
  }

  public pushSubTodo({ task, uuid }: TPushSubTodoProps): ISubTodoModel {
    const uuidSubTodo = uuid ? uuid : uuidv4();

    this.subTodos[uuidSubTodo] = new SubTodoModel({
      uuid: uuidSubTodo,
      uuidPinTodo: this.uuid,
      task: task,
    });

    return this.subTodos[uuidSubTodo];
  }
}

export default MainTodoModel;
