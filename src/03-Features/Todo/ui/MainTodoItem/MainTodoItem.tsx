import type { FC, ReactElement } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useAppDispatch } from "00-App/store";
import addSubTodoIcon from "05-Shared/assets/svg/add-icon.svg";
import { addSubTodo } from "03-Features/Todo/models/TodoSlice";
import MainTodoModel from "03-Features/Todo/models/MainTodoModel";
import { Button, ETypeButtonStyle, ETypeSizeButtom } from "05-Shared/ui/Button";

import TodoEditForm from "../TodoEditForm/TodoEditForm";
import TodoItemButtons from "../TodoItemButtons/TodoItemButtons";
import type { ISubTodoModel, TSubTodo } from "../../models/type";

import "./_style.scss";

interface IProps {
  id: number;
  task: string;
}

const MainTodoItem: FC<IProps> = ({ id, task }): ReactElement => {
  const [isActiveEdit, setIsActiveEdit] = useState<boolean>(false);
  const [isMouseEnter, setIsMouseEnter] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  // Создание модели
  const todoModel: MainTodoModel = useMemo(
    () => new MainTodoModel({ id: id, task: task }),
    [id, task]
  );

  // Вешаем и снимаем слушатели формы редактирования Todo
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent): void => {
      if (e.code === "Escape") {
        setIsActiveEdit(false);
      }
    };

    if (isActiveEdit) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isActiveEdit]);

  // Хендлер создания подзадачи
  const handleCreateSubTodo = useCallback(() => {
    const newSubTodoModel: ISubTodoModel = todoModel.pushSubTodo("Привет");

    const objNewSubTodo: TSubTodo = {
      id: newSubTodoModel.id,
      task: newSubTodoModel.task,
    };

    dispatch(addSubTodo({ idPinnedTodo: todoModel.id, subTodo: objNewSubTodo }));
  }, [dispatch, todoModel]);

  return (
    <>
      <TodoItemButtons
        todoModel={todoModel}
        isActiveEdit={isActiveEdit}
        setIsActiveEdit={setIsActiveEdit}
      />
      <article
        className="todo-item__todo"
        onMouseEnter={() => setIsMouseEnter(true)}
        onMouseLeave={() => setIsMouseEnter(false)}>
        {isActiveEdit ? (
          // Показываем форму редактирования
          <TodoEditForm
            todoModel={todoModel}
            placeholderTask={todoModel.task}
            setIsActiveEdit={setIsActiveEdit}
          />
        ) : (
          // Показываем текст задачи
          <p className="todo__task">{todoModel.task}</p>
        )}

        {isMouseEnter && !isActiveEdit && (
          // Показываем кнопку добавления подзадачи
          <Button
            className="todo__new-subtodo-button"
            image={{ imageSrc: addSubTodoIcon, alt: "Кнопка добавить подзадачу" }}
            typeStyle={ETypeButtonStyle.icon}
            typeSize={ETypeSizeButtom.small}
            onClick={() => {
              handleCreateSubTodo();
            }}
          />
        )}
      </article>
    </>
  );
};

export default MainTodoItem;
