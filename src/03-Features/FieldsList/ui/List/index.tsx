import { FC } from "react";

import "./_style.scss";
import { Button, ETypeButtonStyle, ETypeSizeButtom } from "05-Shared/ui/Button";
import { TField } from "05-Shared/types";

interface IProps {
  fields: TField[];
}

const FieldsList: FC<IProps> = ({ fields }) => {
  console.log(fields);
  return (
    <aside className="fields">
      <ul className="fields__list">
        {fields.map((field, index) => {
          return (
            <li className="list__field-item" key={index}>
              <Button
                text={field.name}
                className={field.active ? "field__button field__active" : "field__button"}
                typeStyle={ETypeButtonStyle.primary}
                typeSize={ETypeSizeButtom.medium}
                onClick={() => {
                  console.log(field.uuid, field.uuidTodos);
                }}
              />
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default FieldsList;
