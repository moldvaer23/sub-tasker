export type TTodo = {
  id: number;
  task: string;
};

export interface ITodoModel {
  task: string;
  changeTask(task: string): ITodoModel;
}

export interface ITodoModelProps {
  id: number;
  task: string;
}
