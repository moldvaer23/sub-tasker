import type { FC, ReactElement } from "react";

import editIcon from "05-Shared/assets/svg/edit-icon.svg";
import closeIcon from "05-Shared/assets/svg/close-icon.svg";
import deleteIcon from "05-Shared/assets/svg/delete-icon.svg";
import { Button, ETypeButtonStyle, ETypeSizeButtom } from "05-Shared/ui/Button";

import "./_style.scss";

interface IProps {
  handleDelete: () => void;
  isActiveEdit: boolean;
  setIsActiveEdit: (isActive: boolean) => void;
}

const TodoItemButtons: FC<IProps> = ({
  handleDelete,
  isActiveEdit,
  setIsActiveEdit,
}): ReactElement => {
  const handleEditButtonClick = (): void => {
    setIsActiveEdit(true);
  };

  const handleCloseButtonClick = (): void => {
    setIsActiveEdit(false);
  };

  return (
    <div className="todo-item__buttons-wrapper">
      <Button
        image={{ imageSrc: deleteIcon, alt: "Кнопка удалиния" }}
        typeStyle={ETypeButtonStyle.icon}
        typeSize={ETypeSizeButtom.small}
        onClick={handleDelete}
      />

      {!isActiveEdit ? (
        // Показываем кнопку редактировать
        <Button
          image={{ imageSrc: editIcon, alt: "Кнопка редактирования" }}
          typeStyle={ETypeButtonStyle.icon}
          typeSize={ETypeSizeButtom.small}
          onClick={handleEditButtonClick}
        />
      ) : (
        // Показываем кнопку закрыть форму редактирования
        <>
          <Button
            image={{ imageSrc: closeIcon, alt: "Кнопка закрыть форму редактирования" }}
            typeStyle={ETypeButtonStyle.icon}
            typeSize={ETypeSizeButtom.small}
            onClick={handleCloseButtonClick}
          />
        </>
      )}
    </div>
  );
};

export default TodoItemButtons;
