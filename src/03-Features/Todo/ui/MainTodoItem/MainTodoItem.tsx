import type { FC, ReactElement } from "react";
import { useEffect, useMemo, useState } from "react";

import { useAppDispatch } from "00-App/store";
import addSubTodoIcon from "05-Shared/assets/svg/add-icon.svg";
import { addSubTodo } from "03-Features/Todo/models/TodoSlice";
import MainTodoModel from "03-Features/Todo/models/MainTodoModel";
import { Button, ETypeButtonStyle, ETypeSizeButtom } from "05-Shared/ui/Button";

import type { ISubTodoModel, TSubTodo } from "../../models/type";
import TodoEditForm from "../TodoEditForm/TodoEditForm";
import TodoItemButtons from "../TodoItemButtons/TodoItemButtons";

import "./_style.scss";

interface IProps {
  id: number;
  task: string;
}

const MainTodoItem: FC<IProps> = ({ id, task }): ReactElement => {
  const [isActiveEdit, setIsActiveEdit] = useState<boolean>(false);
  const [isMouseEnter, setIsMouseEnter] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const todoModel: MainTodoModel = useMemo(
    (): MainTodoModel => new MainTodoModel({ id: id, task: task }),
    [id, task]
  );

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

  const handleCreateSubTodo = (): void => {
    const newSubTodoModel: ISubTodoModel = todoModel.pushSubTodo("Привет");

    const objNewSubTodo: TSubTodo = {
      id: newSubTodoModel.id,
      task: newSubTodoModel.task,
    };

    dispatch(addSubTodo({ idPinnedTodo: todoModel.id, subTodo: objNewSubTodo }));
  };

  return (
    <>
      {/* Кнопки для взаимодействия с карточкой задачи */}
      <TodoItemButtons
        todoModel={todoModel}
        isActiveEdit={isActiveEdit}
        setIsActiveEdit={setIsActiveEdit}
      />
      <article
        className="todo-item__todo"
        onMouseEnter={(): void => {
          setIsMouseEnter(true);
        }}
        onMouseLeave={(): void => {
          setIsMouseEnter(false);
        }}>
        {/* Если нажали на кнопку редактирования задачи, показываем форму редактирования */}
        {isActiveEdit ? (
          <TodoEditForm
            todoModel={todoModel}
            setIsActiveEdit={setIsActiveEdit}
            placeholderTask={todoModel.task}
          />
        ) : (
          <p className="todo__task">{todoModel.task}</p>
        )}
        {/* Если навели на карточку, она не в состоянии редактирования */}
        {/* Показываем кнопку добавления подзадачи  */}
        {isMouseEnter && !isActiveEdit && (
          <Button
            className="todo__new-subtodo-button"
            image={{
              imageSrc: addSubTodoIcon,
              alt: "Кнопка добавить подзадачу",
            }}
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
