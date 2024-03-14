import type { Dispatch, FC, ReactElement } from "react";

import { useAppDispatch } from "00-App/store";

// svg
import editIcon from "05-Shared/assets/svg/edit-icon.svg";
import closeIcon from "05-Shared/assets/svg/close-icon.svg";
import deleteIcon from "05-Shared/assets/svg/delete-icon.svg";

import { Button, ETypeButtonStyle, ETypeSizeButtom, TImageSrcProps } from "05-Shared/ui/Button";

import { deleteTodo } from "../../models/TodoSlice";

import "./_style.scss";

interface IProps {
  todoId: number;
  isActiveEdit: boolean;
  setIsActiveEdit: Dispatch<React.SetStateAction<boolean>>;
}

const TodoItemButtons: FC<IProps> = ({ setIsActiveEdit, isActiveEdit, todoId }): ReactElement => {
  const dispath = useAppDispatch();

  // Конфиги для иконок кнопок
  const configImageDelete: TImageSrcProps = {
    imageSrc: deleteIcon,
    alt: "Кнопка удалиния",
  };

  const configImageEdit: TImageSrcProps = {
    imageSrc: editIcon,
    alt: "Кнопка редактирования",
  };

  const configImageClose: TImageSrcProps = {
    imageSrc: closeIcon,
    alt: "Кнопка закрыть",
  };

  return (
    <div className="todo-item__buttons-wrapper">
      <Button
        image={configImageDelete}
        typeStyle={ETypeButtonStyle.icon}
        typeSize={ETypeSizeButtom.small}
        onClick={() => dispath(deleteTodo(todoId))}
      />

      {/* Если нажатия на кнопку редактирования не было то показываем кнопку редактирования */}
      {/* Иначе показываем кнопку закрыть форму редактирования */}
      {!isActiveEdit ? (
        <Button
          image={configImageEdit}
          typeStyle={ETypeButtonStyle.icon}
          typeSize={ETypeSizeButtom.small}
          onClick={(): void => setIsActiveEdit(true)}
        />
      ) : (
        <Button
          image={configImageClose}
          typeStyle={ETypeButtonStyle.icon}
          typeSize={ETypeSizeButtom.small}
          onClick={(): void => setIsActiveEdit(false)}
        />
      )}
    </div>
  );
};

export default TodoItemButtons;
