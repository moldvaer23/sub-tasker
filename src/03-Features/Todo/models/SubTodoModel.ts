import TodoModel from "./TodoModel";
import type { ISubTodoModel, TSubTodoModelProps } from "./type";

class SubTodoModel extends TodoModel implements ISubTodoModel {
  public idPinnedTodo: number;

  constructor(props: TSubTodoModelProps) {
    super(props);
    this.idPinnedTodo = props.idPinnedTodo;
  }
}

export default SubTodoModel;
