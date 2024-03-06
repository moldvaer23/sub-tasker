import { ITodoModel, ITodoModelProps, TTodo } from "./type";

class TodoModel implements ITodoModel {
  // Поля
  public id: number;
  public task: string;

  // Конструктор
  constructor(props: ITodoModelProps) {
    this.id = props.id;
    this.task = props.task;
  }

  public get getTodo(): TTodo {
    return {
      id: this.id,
      task: this.task,
    };
  }

  // Метод для изменения задачи
  public changeTask(task: string): TodoModel {
    return new TodoModel({ id: this.id, task: task });
  }
}

export default TodoModel;
