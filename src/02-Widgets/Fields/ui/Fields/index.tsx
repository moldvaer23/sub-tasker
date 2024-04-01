import FieldsModel from "02-Widgets/Fields/models/FieldsModel";
import { FieldsList } from "03-Features/FieldsList";
import { TField } from "05-Shared/types";
import { FC } from "react";

const Fields: FC = () => {
  const fieldsModel = new FieldsModel();

  const arr: TField[] = [
    {
      uuid: "111",
      uuidTodos: "1",
      active: true,
      name: "основной проект",
    },
    {
      uuid: "222",
      uuidTodos: "2",
      active: false,
      name: "другой проект",
    },
  ];

  return (
    <>
      <FieldsList fields={fieldsModel.setFields(arr)} />
    </>
  );
};

export default Fields;
