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

  // Создание модели
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

    if (isActiveEdit) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isActiveEdit]);

  return (
    <>
      <TodoItemButtons
        todoModel={todoModel}
        isActiveEdit={isActiveEdit}
        setIsActiveEdit={setIsActiveEdit}
      />
      <article className="todo-item__todo subtodo">
        {isActiveEdit ? (
          //  Показываем форму редактирования
          <TodoEditForm
            todoModel={todoModel}
            placeholderTask={todoModel.task}
            setIsActiveEdit={setIsActiveEdit}
          />
        ) : (
          // Показываем текст подзадачи
          <p className="todo__task">{todoModel.task}</p>
        )}
      </article>
    </>
  );
};

export default SubTodoItem;
