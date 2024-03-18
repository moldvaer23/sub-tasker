// Объекты
type TAbstractTodo = {
  readonly uuid: string;
  task: string;
};

export type TSubTodo = TAbstractTodo;

export type TTodo = TAbstractTodo & {
  subTodos: Record<string, TSubTodo>;
};

// Соглашения для моделей
export interface ITodoModel {
  readonly uuid: string;
  task: string;
}

export interface ISubTodoModel extends ITodoModel {
  uuidPinTodo: string;
}

export type TPushSubTodoProps = {
  task: string;
  uuid?: string;
};

export interface IMainTodoModel extends ITodoModel {
  subTodos: Record<string, ISubTodoModel>;
  pushSubTodo({ task, uuid }: TPushSubTodoProps): ISubTodoModel;
}

// Пропсы моделей
export type TTodoModelProps = {
  readonly uuid?: string;
  task: string;
};

export type TSubTodoModelProps = TTodoModelProps & {
  uuidPinTodo: string;
};

export type TMainTodoModelProps = TTodoModelProps;
