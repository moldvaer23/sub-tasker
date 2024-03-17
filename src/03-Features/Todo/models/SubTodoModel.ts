import TodoModel from "./TodoModel";
import type { TSubTodoModelProps } from "./type";

class SubTodoModel extends TodoModel {
  public idPinnedTodo: number;

  constructor(props: TSubTodoModelProps) {
    super(props);
    this.idPinnedTodo = props.idPinnedTodo;
  }
}

export default SubTodoModel;
