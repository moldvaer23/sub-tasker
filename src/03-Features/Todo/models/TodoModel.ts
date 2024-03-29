import { v4 as uuidv4 } from "uuid";

import { AppDispatch } from "00-App/store";

import type { ITodoModel, TSubTodo, TTodo } from "./type";
import {
  addSubTodo,
  addTodo,
  deleteSubTodo,
  deleteTodo,
  updateSubTodo,
  updateTodo,
} from "./TodoSlice";

class TodoModel implements ITodoModel {
  protected _uuid: string;
  protected _task: string;
  protected _subTodos: Record<string, TSubTodo> = {};

  constructor(protected props: { uuid?: string; task: string; dispatch: AppDispatch }) {
    this._uuid = props.uuid ? props.uuid : uuidv4();
    this._task = props.task;

    // Если это новая задача пушим в state
    if (!props.uuid) {
      props.dispatch(
        addTodo({
          uuid: this._uuid,
          task: this._task,
          subTodos: this._subTodos,
        })
      );
    }
  }

  // Создание подзадачи
  public createSubTodo = (data: { uuid?: string; task: string }): TSubTodo => {
    const uuidSubTodo = data.uuid ? data.uuid : uuidv4();

    const subTodoObj: TSubTodo = {
      uuidPinTodo: this._uuid,
      uuid: uuidSubTodo,
      task: data.task,
    };

    // Создание подзадачи
    this._subTodos[uuidSubTodo] = subTodoObj;

    if (!data.uuid) {
      // Пушим в state
      this.props.dispatch(
        addSubTodo({
          uuidPinTodo: this._uuid,
          subTodo: subTodoObj,
        })
      );
    }

    return subTodoObj;
  };

  // Редактирование задачи
  public editTodo = (data: { uuid: string; task: string }): void | undefined => {
    if (data.uuid !== this._uuid) return undefined;
    this._task = data.task;

    // Пушим в state
    this.props.dispatch(
      updateTodo({
        uuid: this._uuid,
        task: this._task,
      })
    );
  };

  // Редактирование подзадачи
  public editSubTodo = (data: { uuid: string; task: string }): void | undefined => {
    const subTodo = this._subTodos[data.uuid];
    if (subTodo === undefined) return undefined;
    subTodo.task = data.task;

    // Пушим в state
    this.props.dispatch(
      updateSubTodo({
        uuidSubTodo: subTodo.uuid,
        uuidPinTodo: subTodo.uuidPinTodo,
        task: subTodo.task,
      })
    );
  };

  // Удаление задачи
  public deleteTodo = () => {
    this.props.dispatch(deleteTodo(this._uuid));
  };

  // Удаление подзадачи
  public deleteSubTodo = (data: { uuidPinTodo: string; uuidSubTodo: string }) => {
    // Удаляем подзадачу
    delete this._subTodos[data.uuidPinTodo];

    // Удаляем подзадачу из state
    this.props.dispatch(
      deleteSubTodo({
        uuidSubTodo: data.uuidSubTodo,
        uuidPinTodo: data.uuidPinTodo,
      })
    );
  };

  public getTodo = (): TTodo => {
    return {
      uuid: this._uuid,
      task: this._task,
      subTodos: this._subTodos,
    };
  };

  // Получение подзадач
  public getSubTodos = (): TSubTodo[] => {
    return Object.values(this._subTodos);
  };

  public get uuid() {
    return this._uuid;
  }
}

export default TodoModel;
