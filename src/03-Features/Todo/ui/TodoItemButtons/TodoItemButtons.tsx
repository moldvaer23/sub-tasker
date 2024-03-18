import type { FC, ReactElement } from "react";

import { useAppDispatch } from "00-App/store";
import editIcon from "05-Shared/assets/svg/edit-icon.svg";
import closeIcon from "05-Shared/assets/svg/close-icon.svg";
import deleteIcon from "05-Shared/assets/svg/delete-icon.svg";
import SubTodoModel from "03-Features/Todo/models/SubTodoModel";
import MainTodoModel from "03-Features/Todo/models/MainTodoModel";
import { Button, ETypeButtonStyle, ETypeSizeButtom } from "05-Shared/ui/Button";

import { deleteSubTodo, deleteTodo } from "../../models/TodoSlice";

import "./_style.scss";

interface IProps {
  todoModel: MainTodoModel | SubTodoModel;
  isActiveEdit: boolean;
  setIsActiveEdit: (isActive: boolean) => void;
}

const TodoItemButtons: FC<IProps> = ({
  todoModel,
  isActiveEdit,
  setIsActiveEdit,
}): ReactElement => {
  const dispatch = useAppDispatch();

  const handleDelete = (): void => {
    if (todoModel instanceof MainTodoModel) {
      dispatch(deleteTodo(todoModel.id));
    } else if (todoModel instanceof SubTodoModel) {
      dispatch(deleteSubTodo({ idPinnedTodo: todoModel.idPinnedTodo, idSubTodo: todoModel.id }));
    }
  };

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
        <Button
          image={{ imageSrc: closeIcon, alt: "Кнопка закрыть форму редактирования" }}
          typeStyle={ETypeButtonStyle.icon}
          typeSize={ETypeSizeButtom.small}
          onClick={handleCloseButtonClick}
        />
      )}
    </div>
  );
};

export default TodoItemButtons;
