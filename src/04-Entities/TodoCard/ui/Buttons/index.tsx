import { FC } from "react";

import { closeIcon, deleteIcon, editIcon } from "05-Shared/assets/svg";
import { Button, ETypeButtonSize, ETypeButtonStyle } from "05-Shared/ui/Button";

import "./_style.scss";

interface IProps {
  handleDelete: () => void;
  isActiveEdit: boolean;
  setIsActiveEdit: (isActive: boolean) => void;
}

const TodoButtons: FC<IProps> = ({ handleDelete, isActiveEdit, setIsActiveEdit }) => {
  const handleEditButtonClick = (): void => {
    setIsActiveEdit(true);
  };

  const handleCloseButtonClick = (): void => {
    setIsActiveEdit(false);
  };

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
            onClick={handleEditButtonClick}
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
            onClick={handleCloseButtonClick}
            typeSize={ETypeButtonSize.small}
            typeStyle={ETypeButtonStyle.icon}
          />
        </>
      )}
    </div>
  );
};

export default TodoButtons;
