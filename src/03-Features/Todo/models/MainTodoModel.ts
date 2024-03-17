import TodoModel from "./TodoModel";
import SubTodoModel from "./SubTodoModel";
import type { IMainTodoModel, ISubTodoModel, TMainTodoModelProps } from "./type";

class MainTodoModel extends TodoModel implements IMainTodoModel {
  public subTodos: Record<number, ISubTodoModel> = {};

  constructor(props: TMainTodoModelProps) {
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
