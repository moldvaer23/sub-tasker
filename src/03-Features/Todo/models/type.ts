// Задачи
export type TTodo = {
  readonly id: number;
  task: string;
};

export interface ITodoModel {
  getTodo: TTodo;
  changeTask(task: string): ITodoModel;
}

export type TTodoModelProps = TTodo;

// Подзадачи
export type TSubTodo = TTodo & {
  readonly pinnedId: number;
};

export interface ISubTodoModel {
  getSubTodo: TSubTodo;
  changeSubTask(task: string): ISubTodoModel;
}

export type TSubTodoModelProps = TSubTodo;
