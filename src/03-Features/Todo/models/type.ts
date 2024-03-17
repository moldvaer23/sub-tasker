// Объекты
type TAbstractTodo = {
  readonly id: number;
  task: string;
};

export type TSubTodo = TAbstractTodo;

export type TTodo = TAbstractTodo & {
  subTodos: Record<number, TSubTodo>;
};

// Соглашения для моделей
export interface ITodoModel {
  readonly id: number;
  task: string;
}

export interface ISubTodoModel extends ITodoModel {
  idPinnedTodo: number;
}

export interface IMainTodoModel extends ITodoModel {
  subTodos: Record<number, ISubTodoModel>;
  pushSubTodo(task: string): ISubTodoModel;
}

// Пропсы моделей
export type TTodoModelProps = {
  readonly id: number;
  task: string;
};

export type TSubTodoModelProps = TTodoModelProps & {
  idPinnedTodo: number;
};

export type TMainTodoModelProps = TTodoModelProps;
