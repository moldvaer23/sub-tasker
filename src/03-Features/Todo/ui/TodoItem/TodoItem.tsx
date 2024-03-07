import { FC, useEffect, useState } from "react";
import { useAppDispatch } from "00-App/store";
import { TTodo } from "../../models/type";
import { deleteTodo } from "../../models/TodoSlice";
import TodoModel from "../../models/TodoModel";

import TodoEditForm from "../TodoEditForm/TodoEditForm";
import { Button } from "05-Shared/ui/Button";

interface IProps {
  id: number;
  task: string;
}

const TodoItem: FC<IProps> = ({ id, task }) => {
  const [isActiveEdit, setIsActiveEdit] = useState<boolean>(false);
  const dispath = useAppDispatch();

  // Создаем модель Todo
  const todoModel: TodoModel = new TodoModel({ id: id, task: task });

  // Запрашиваем объект Todo
  const todo: TTodo = todoModel.getTodo;

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
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isActiveEdit]);

  return (
    <article>
      <Button text="Редактировать" onClick={(): void => setIsActiveEdit(true)} />
      <Button text="Удалить" onClick={() => dispath(deleteTodo(todo.id))} />
      {isActiveEdit ? (
        <TodoEditForm
          todoModel={todoModel}
          setIsActiveEdit={setIsActiveEdit}
          placeholderTask={todo.task}
        />
      ) : (
        todo.task
      )}
    </article>
  );
};

export default TodoItem;
