export type TTodo = {
  id: number;
  task: string;
};

export interface ITodoModel {
  getTodo: TTodo;
  changeTask(task: string): ITodoModel;
}

export interface ITodoModelProps {
  id: number;
  task: string;
}
