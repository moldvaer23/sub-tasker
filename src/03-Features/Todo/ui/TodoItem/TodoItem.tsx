import type { FC, ReactElement } from "react";
import { useEffect, useMemo, useState } from "react";

import addSubTaskIcon from "05-Shared/assets/svg/add-icon.svg";
import { Button, ETypeButtonStyle, ETypeSizeButtom } from "05-Shared/ui/Button";

import TodoModel from "../../models/TodoModel";
import type { TTodo } from "../../models/type";
import TodoEditForm from "../TodoEditForm/TodoEditForm";
import TodoItemButtons from "../TodoItemButtons/TodoItemButtons";

import "./_style.scss";

interface IProps {
  id: number;
  task: string;
}

const TodoItem: FC<IProps> = ({ id, task }): ReactElement => {
  const [isActiveEdit, setIsActiveEdit] = useState<boolean>(false);
  const [isMouseEnter, setIsMouseEnter] = useState<boolean>(false);

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
      {/* Кнопки для взаимодействия с карточкой задачи */}
      <TodoItemButtons
        isActiveEdit={isActiveEdit}
        setIsActiveEdit={setIsActiveEdit}
        todoId={todo.id}
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
            placeholderTask={todo.task}
          />
        ) : (
          <p className="todo__task">{todo.task}</p>
        )}
        {/* Если навели на карточку и она не в состоянии редактирования показываем кнопку добавления подзадачи */}
        {isMouseEnter && !isActiveEdit && (
          <Button
            className="todo__new-subtask-button"
            image={{
              imageSrc: addSubTaskIcon,
              alt: "Кнопка добавить подзадачу",
            }}
            typeStyle={ETypeButtonStyle.icon}
            typeSize={ETypeSizeButtom.small}
          />
        )}
      </article>
    </>
  );
};

export default TodoItem;
