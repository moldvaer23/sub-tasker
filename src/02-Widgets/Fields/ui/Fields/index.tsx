import { FC } from "react";

import { TField } from "05-Shared/types";
import { useAppDispatch } from "00-App/store";
import { FieldsList } from "03-Features/FieldsList";
import FieldsModel from "02-Widgets/Fields/models/FieldsModel";

const Fields: FC = () => {
  const dispatch = useAppDispatch();
  const fieldsModel = new FieldsModel({ dispatch: dispatch });

  // Хендлер установки активного поля
  const setActiveField = (uuid: string) => {
    fieldsModel.setActiveField(uuid);
  };

  // Хендлер инициализации полей
  const setFields = (fields: TField[]) => {
    fieldsModel.setFields(fields);
  };

  // Хендлер создания нового поля
  const createNewField = (data: { name: string; uuidTodos?: string }) => {
    return fieldsModel.createField({ name: data.name, uuidTodos: data.uuidTodos });
  };

  return (
    <>
      <FieldsList
        createNewField={createNewField}
        setFields={setFields}
        setActiveField={setActiveField}
      />
    </>
  );
};

export default Fields;
