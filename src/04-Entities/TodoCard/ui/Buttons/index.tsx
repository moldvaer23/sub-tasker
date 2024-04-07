import type { FC, ReactElement } from "react";

import editIcon from "05-Shared/assets/svg/edit-icon.svg";
import closeIcon from "05-Shared/assets/svg/close-icon.svg";
import deleteIcon from "05-Shared/assets/svg/delete-icon.svg";
import { Button, ETypeButtonStyle, ETypeButtonSize } from "05-Shared/ui/Button";

import "./_style.scss";

interface IProps {
  handleDelete: () => void;
  isActiveEdit: boolean;
  setIsActiveEdit: (isActive: boolean) => void;
}

const TodoButtons: FC<IProps> = ({ handleDelete, isActiveEdit, setIsActiveEdit }): ReactElement => {
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
            typeStyle={ETypeButtonStyle.icon}
            typeSize={ETypeButtonSize.small}
            onClick={handleDelete}
          />
          {/*  Показываем кнопку редактировать */}
          <Button
            className="todo__button"
            image={{ imageSrc: editIcon, alt: "Кнопка редактирования" }}
            typeStyle={ETypeButtonStyle.icon}
            typeSize={ETypeButtonSize.small}
            onClick={handleEditButtonClick}
          />
        </>
      ) : (
        // Показываем кнопку закрыть форму редактирования
        <>
          <Button
            className="todo__button"
            image={{ imageSrc: closeIcon, alt: "Кнопка закрыть форму редактирования" }}
            typeStyle={ETypeButtonStyle.icon}
            typeSize={ETypeButtonSize.small}
            onClick={handleCloseButtonClick}
          />
        </>
      )}
    </div>
  );
};

export default TodoButtons;
