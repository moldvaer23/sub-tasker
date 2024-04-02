import { FC } from "react";

import { TField } from "05-Shared/types";
import { useAppSelector } from "00-App/store";
import { Button, ETypeButtonStyle, ETypeSizeButtom } from "05-Shared/ui/Button";

import "./_style.scss";

interface IProps {
  createNewField: (data: { name: string; uuidTodos?: string }) => TField;
  setActiveField: (uuid: string) => void;
  setFields: (fields: TField[]) => void;
}

const FieldsList: FC<IProps> = ({ createNewField, setFields, setActiveField }) => {
  const activeField = useAppSelector((state) => state.fields.acitveField);
  const fieldsStore = useAppSelector((state) => state.fields.fields);

  const fields: TField[] = Object.values(fieldsStore);

  // Инициализируем поля
  if (fields.length !== 0) {
    setFields(fields);
  }

  return (
    <aside className="fields">
      <Button
        className="fields__button"
        text="Создать новый лист"
        typeSize={ETypeSizeButtom.medium}
        typeStyle={ETypeButtonStyle.accent}
        onClick={() => {
          const newField = createNewField({
            name: "тест",
          });

          setActiveField(newField.uuid);
        }}
      />
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
  );
};

export default FieldsList;
