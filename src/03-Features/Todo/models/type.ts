export type TSubTodo = {
  readonly id: number;
  task: string;
};

export type TTodo = {
  readonly id: number;
  task: string;
  subTodos: Record<number, TSubTodo>;
};

export interface ITodoModel {
  readonly id: number;
  task: string;
}

export interface ISubTodoModel extends ITodoModel {
  idPinnedTodo: number;
}

export type TTodoModelProps = {
  readonly id: number;
  task: string;
};

export type TSubTodoModelProps = TTodoModelProps & {
  idPinnedTodo: number;
};
