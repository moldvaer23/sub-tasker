import { v4 as uuidv4 } from "uuid";

import { AppDispatch } from "00-App/store";
import { IFields, TField } from "05-Shared/types";

import { createField, setActiveField } from "./FieldsSlice";

class FieldsModel implements IFields {
  protected _fields: Record<string, TField> = {};
  protected _activeField = "";

  constructor(protected props: { dispatch: AppDispatch }) {}

  // Установка активного поля
  public setActiveField = (uuid: string): void => {
    this._activeField = uuid;
    this.props.dispatch(setActiveField(uuid));
    localStorage.setItem("activeField", uuid);
  };

  // Создание нового поля
  public createField = (data: { uuidTodos?: string; name: string }): TField => {
    const uuid: string = uuidv4();
    const uuidTodos: string = data.uuidTodos ? data.uuidTodos : uuidv4();

    const field: TField = {
      uuid: uuid,
      uuidTodos: uuidTodos,
      name: data.name,
    };

    this.props.dispatch(createField(field));

    this._fields[uuid] = field;

    if (!data.uuidTodos) {
      localStorage.setItem(uuidTodos, JSON.stringify({}));
    }

    return field;
  };

  // Установка значений полей
  public setFields = (fields: TField[]): TField[] => {
    fields.map((field) => {
      this._fields[field.uuid] = field;
    });

    return this.getfields();
  };

  // Получение полей
  public getfields = (): TField[] => {
    return Object.values(this._fields);
  };

  // Получение поля
  public getfield = (uuid: string): TField | undefined => {
    const field = this._fields[uuid];
    if (!field) undefined;

    return field;
  };
}

export default FieldsModel;
