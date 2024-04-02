// Объекты задач
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
  createSubTodo: (data: { uuid?: string; task: string }) => TSubTodo;
  deleteSubTodo: (data: { uuidPinTodo: string; uuidSubTodo: string }) => void;
  deleteTodo: () => void;
  editSubTodo: (data: { uuid: string; task: string }) => void | undefined;
  editTodo: (data: { uuid: string; task: string }) => void | undefined;
  getSubTodos: () => TSubTodo[];
  getTodo: () => TTodo;
  uuid: string;
}

// Объект поля
export type TField = {
  uuid: string;
  uuidTodos: string;
  name: string;
};

// Модель листов задач
export interface IFields {
  createField: (data: { uuidTodos?: string; name: string }) => TField;
  getfield: (uuid: string) => TField | undefined;
  getfields: () => TField[];
  setActiveField: (uuid: string) => void;
  setFields: (fields: TField[]) => TField[];
}
