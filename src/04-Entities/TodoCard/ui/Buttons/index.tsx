import { FC } from "react";

import { closeIcon, deleteIcon, editIcon } from "05-Shared/assets/svg";
import { Button, ETypeButtonSize, ETypeButtonStyle } from "05-Shared/ui/Button";

import "./_style.scss";

interface IProps {
  handleCloseEdit: () => void;
  handleDelete: () => void;
  handleOpenEdit: () => void;
  isActiveEdit: boolean;
}

const TodoButtons: FC<IProps> = ({
  handleCloseEdit,
  handleDelete,
  handleOpenEdit,
  isActiveEdit,
}) => {
  return (
    <div className="todo__buttons-wrapper">
      {!isActiveEdit ? (
        <>
          <Button
            className="todo__button"
            image={{ imageSrc: deleteIcon, alt: "Кнопка удалиния" }}
            onClick={handleDelete}
            typeSize={ETypeButtonSize.small}
            typeStyle={ETypeButtonStyle.icon}
          />
          <Button
            className="todo__button"
            image={{ imageSrc: editIcon, alt: "Кнопка редактирования" }}
            onClick={handleOpenEdit}
            typeSize={ETypeButtonSize.small}
            typeStyle={ETypeButtonStyle.icon}
          />
        </>
      ) : (
        // Показываем кнопку закрыть форму редактирования
        <>
          <Button
            className="todo__button"
            image={{ imageSrc: closeIcon, alt: "Кнопка закрыть форму редактирования" }}
            onClick={handleCloseEdit}
            typeSize={ETypeButtonSize.small}
            typeStyle={ETypeButtonStyle.icon}
          />
        </>
      )}
    </div>
  );
};

export default TodoButtons;
