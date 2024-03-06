import { TTodo, ITodoModel, ITodoModelProps } from "./type";

class TodoModel implements ITodoModel {
  // Поля
  static idCount: number = 0;

  private _id: number;
  private task: string;

  // Конструктор
  constructor(props: ITodoModelProps) {
    this._id = TodoModel.idCount;
    this.task = props.task;

    TodoModel.idCount++;
  }

  // Возвращаем объект todo
  public get getTodo(): TTodo {
    return {
      id: this._id,
      task: this.task,
    };
  }
}

export default TodoModel;
