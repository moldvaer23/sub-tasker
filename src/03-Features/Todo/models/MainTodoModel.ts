import TodoModel from "./TodoModel";
import type { TTodoModelProps, TSubTodo } from "./type";

class MainTodoModel extends TodoModel {
  public subTodos: TSubTodo[] = [];

  constructor(props: TTodoModelProps) {
    super(props);
  }

  public pushSubTodo(task: string): TSubTodo {
    const id: number =
      this.subTodos.length === 0 ? 0 : this.subTodos[this.subTodos.length - 1].id + 1;

    this.subTodos.push({ id: id, task: task });

    return this.subTodos[this.subTodos.length - 1];
  }
}

export default MainTodoModel;
