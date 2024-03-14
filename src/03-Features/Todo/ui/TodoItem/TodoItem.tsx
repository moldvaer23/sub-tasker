import type { FC, ReactElement } from "react";
import { useEffect, useMemo, useState } from "react";

import { useAppDispatch } from "00-App/store";

// svg
import editIcon from "05-Shared/assets/svg/edit-icon.svg";
import closeIcon from "05-Shared/assets/svg/close-icon.svg";
import deleteIcon from "05-Shared/assets/svg/delete-icon.svg";

import { Button, ETypeButtonStyle, ETypeSizeButtom } from "05-Shared/ui/Button";

import TodoModel from "../../models/TodoModel";
import type { TTodo } from "../../models/type";
import { deleteTodo } from "../../models/TodoSlice";
import TodoEditForm from "../TodoEditForm/TodoEditForm";

import "./_style.scss";

interface IProps {
  id: number;
  task: string;
}

const TodoItem: FC<IProps> = ({ id, task }): ReactElement => {
  const [isActiveEdit, setIsActiveEdit] = useState<boolean>(false);
  const dispath = useAppDispatch();

  // Создаем модель Todo
  const todoModel: TodoModel = useMemo(() => new TodoModel({ id: id, task: task }), [id, task]);

  // Запрашиваем объект Todo
  const todo: TTodo = useMemo(() => todoModel.getTodo, [todoModel]);

  // Вешаем и снимаем слушатели формы редактирования Todo
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent): void => {
      if (e.code === "Escape") {
        setIsActiveEdit(false);
      }
    };

    // Если форма редактирования task открыта вешаем слушатели закрытия
    if (isActiveEdit) {
      document.addEventListener("keydown", handleEsc);
    }

    // Когда компонент демонтирован снимаем слушатели
    return (): void => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isActiveEdit]);

  return (
    <>
      <div className="todo-item__buttons-wrapper">
        <Button
          image={{
            imageSrc: deleteIcon,
            alt: "Кнопка удалиния",
          }}
          typeStyle={ETypeButtonStyle.icon}
          typeSize={ETypeSizeButtom.small}
          onClick={() => dispath(deleteTodo(todo.id))}
        />

        {!isActiveEdit ? (
          <Button
            image={{
              imageSrc: editIcon,
              alt: "Кнопка редактирования",
            }}
            typeStyle={ETypeButtonStyle.icon}
            typeSize={ETypeSizeButtom.small}
            onClick={(): void => setIsActiveEdit(true)}
          />
        ) : (
          <Button
            image={{
              imageSrc: closeIcon,
              alt: "Кнопка закрыть",
            }}
            typeStyle={ETypeButtonStyle.icon}
            onClick={(): void => setIsActiveEdit(false)}
          />
        )}
      </div>
      <article className="todo-item__todo">
        {isActiveEdit ? (
          <TodoEditForm
            todoModel={todoModel}
            setIsActiveEdit={setIsActiveEdit}
            placeholderTask={todo.task}
          />
        ) : (
          <p className="todo__task">{todo.task}</p>
        )}
      </article>
    </>
  );
};

export default TodoItem;
