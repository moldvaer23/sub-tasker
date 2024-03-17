import type { FC, ReactElement } from "react";
import { useEffect, useMemo, useState } from "react";

import SubTodoModel from "03-Features/Todo/models/SubTodoModel";

import TodoEditForm from "../TodoEditForm/TodoEditForm";
import TodoItemButtons from "../TodoItemButtons/TodoItemButtons";

interface IProps {
  id: number;
  idPinnedTodo: number;
  task: string;
}

const SubTodoItem: FC<IProps> = ({ id, idPinnedTodo, task }): ReactElement => {
  const [isActiveEdit, setIsActiveEdit] = useState<boolean>(false);

  const todoModel: SubTodoModel = useMemo(
    (): SubTodoModel => new SubTodoModel({ id: id, idPinnedTodo: idPinnedTodo, task: task }),
    [id, idPinnedTodo, task]
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

  return (
    <>
      {/* Кнопки для взаимодействия с карточкой задачи */}
      <TodoItemButtons
        todoModel={todoModel}
        isActiveEdit={isActiveEdit}
        setIsActiveEdit={setIsActiveEdit}
      />
      <article className="todo-item__todo subtodo">
        {/* Если нажали на кнопку редактирования задачи, показываем форму редактирования */}
        {isActiveEdit ? (
          <TodoEditForm
            todoModel={todoModel}
            placeholderTask={todoModel.task}
            setIsActiveEdit={setIsActiveEdit}
          />
        ) : (
          <p className="todo__task">{todoModel.task}</p>
        )}
      </article>
    </>
  );
};

export default SubTodoItem;
