import { FC, useState } from "react";

import { TField } from "05-Shared/types";
import { Modal } from "04-Entities/Modal";
import { useAppSelector } from "00-App/store";
import { Button, ETypeButtonStyle, ETypeSizeButtom } from "05-Shared/ui/Button";

import Form from "../Form";

import "./_style.scss";

interface IProps {
  createNewField: (data: { name: string; uuidTodos?: string }) => TField;
  deleteField: (data: { uuid: string; uuidTodos: string }) => void;
  editFieldName: (data: { uuid: string; name: string }) => void;
  setActiveField: (uuid: string) => void;
  setFields: (fields: TField[]) => void;
}

const FieldsList: FC<IProps> = ({
  createNewField,
  deleteField,
  editFieldName,
  setActiveField,
  setFields,
}) => {
  // Состояния статуса модальных окон
  const [openEditField, setOpenEditField] = useState<boolean>(false);
  const [openNewField, setOpenNewField] = useState<boolean>(false);

  const activeField = useAppSelector((state) => state.fields.acitveField);
  const fieldsStore = useAppSelector((state) => state.fields.fields);

  const fields: TField[] = Object.values(fieldsStore);

  // Инициализируем поля
  if (fields.length !== 0) {
    setFields(fields);
  }

  return (
    <>
      <aside className="fields">
        <div className="fields__buttons">
          <Button
            className="fields__button"
            text="Создать новый лист"
            typeSize={ETypeSizeButtom.medium}
            typeStyle={ETypeButtonStyle.accent}
            onClick={() => setOpenNewField(true)}
          />
          <Button
            className="fields__button"
            text="Изменить название листа"
            typeSize={ETypeSizeButtom.medium}
            typeStyle={ETypeButtonStyle.accent}
            onClick={() => setOpenEditField(true)}
          />
          <Button
            className="fields__button"
            text="Удалить лист"
            typeSize={ETypeSizeButtom.medium}
            typeStyle={ETypeButtonStyle.accent}
            onClick={() =>
              deleteField({ uuid: activeField, uuidTodos: fieldsStore[activeField].uuidTodos })
            }
          />
        </div>
        <ul className="fields__list">
          {fields.length !== 0 &&
            fields.map((field, index) => {
              return (
                <li className="list__field-item" key={index}>
                  <Button
                    text={field.name}
                    className={
                      field.uuid === activeField ? "field__button field__active" : "field__button"
                    }
                    typeStyle={ETypeButtonStyle.primary}
                    typeSize={ETypeSizeButtom.medium}
                    onClick={
                      field.uuid !== activeField
                        ? () => {
                            setActiveField(field.uuid);
                          }
                        : undefined
                    }
                  />
                </li>
              );
            })}
        </ul>
      </aside>

      {/* Модальные окна */}
      {openNewField && (
        <Modal setOpen={setOpenNewField}>
          <Form
            label="Введи название нового листа"
            buttonText="Создать"
            onSubmit={(value: string) => {
              const newField = createNewField({
                name: value,
              });

              setActiveField(newField.uuid);
              setOpenNewField(false);
            }}
          />
        </Modal>
      )}

      {openEditField && (
        <Modal setOpen={setOpenEditField}>
          <Form
            label="Введи новое название листа"
            buttonText="Применить"
            onSubmit={(value: string) => {
              editFieldName({ uuid: activeField, name: value });
              setOpenEditField(false);
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default FieldsList;
