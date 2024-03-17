export type TSubTodo = {
  readonly id: number;
  task: string;
};

export type TTodo = {
  readonly id: number;
  task: string;
  subTodos: TSubTodo[];
};

export interface ITodoModel {
  readonly id: number;
  task: string;
}

export type TTodoModelProps = {
  readonly id: number;
  task: string;
};

export type TSubTodoModelProps = TTodoModelProps & {
  idPinnedTodo: number;
};
