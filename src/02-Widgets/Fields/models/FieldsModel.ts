import { IFields, TField } from "05-Shared/types";

class FieldsModel implements IFields {
  protected _fields: Record<string, TField> = {};

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
