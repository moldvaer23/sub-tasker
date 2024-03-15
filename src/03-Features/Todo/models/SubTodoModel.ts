import type { ISubTodoModel, TSubTodo, TSubTodoModelProps } from "./type";

class SubTodoModel implements ISubTodoModel {
  public id: number;
  public pinnedId: number;
  public task: string;

  // Конструктор
  constructor(props: TSubTodoModelProps) {
    this.id = props.id;
    this.pinnedId = props.pinnedId;
    this.task = props.task;
  }

  // Отдаем объект подзадачи
  public get getSubTodo(): TSubTodo {
    return {
      id: this.id,
      pinnedId: this.pinnedId,
      task: this.task,
    };
  }

  // Метод для изменения текста подзадачи
  public changeSubTask(task: string): ISubTodoModel {
    return new SubTodoModel({ id: this.id, pinnedId: this.pinnedId, task: task });
  }
}

export default SubTodoModel;
