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

// Модель задачи
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

export type TField = {
  uuid: string;
  uuidTodos: string;
  active: boolean;
  name: string;
};

// Модель листов задач
export interface IFields {
  setFields: (fields: TField[]) => TField[];
  getfields: () => TField[];
  getfield: (uuid: string) => TField | undefined;
}
