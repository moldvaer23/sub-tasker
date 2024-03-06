export type TTodo = {
  id: number;
  task: string;
};

export interface ITodoModel {
  // Геттеры
  getTodo: TTodo;
}

export interface ITodoModelProps {
  task: string;
}
