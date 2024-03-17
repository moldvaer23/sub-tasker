import SubTodoModel from "./SubTodoModel";
import TodoModel from "./TodoModel";
import type { TTodoModelProps, ISubTodoModel } from "./type";

class MainTodoModel extends TodoModel {
  public subTodos: Record<number, ISubTodoModel> = {};

  constructor(props: TTodoModelProps) {
    super(props);
  }

  public pushSubTodo(task: string): ISubTodoModel {
    const subTodoids: number[] = Object.keys(this.subTodos).map((key) => parseInt(key));
    const newSubTodoId: number = subTodoids.length === 0 ? 0 : Math.max(...subTodoids) + 1;

    this.subTodos[newSubTodoId] = new SubTodoModel({
      id: newSubTodoId,
      idPinnedTodo: this.id,
      task: task,
    });

    return this.subTodos[newSubTodoId];
  }
}

export default MainTodoModel;
