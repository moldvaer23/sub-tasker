// Объекты
type TAbstractTodo = {
  readonly uuid: string;
  task: string;
};

export type TSubTodo = TAbstractTodo & {
  uuidPinTodo: string;
};

export type TTodo = TAbstractTodo & {
  subTodos: Record<string, TSubTodo>;
};

export interface ITodoModel {
  uuid: string;
  createSubTodo: (data: { uuid?: string; task: string }) => TSubTodo;

  editTodo: (data: { uuid: string; task: string }) => void | undefined;
  editSubTodo: (data: { uuid: string; task: string }) => void | undefined;

  deleteTodo: () => void;
  deleteSubTodo: (data: { uuidPinTodo: string; uuidSubTodo: string }) => void;

  getTodo: () => TTodo;
  getSubTodos: () => TSubTodo[];
}
