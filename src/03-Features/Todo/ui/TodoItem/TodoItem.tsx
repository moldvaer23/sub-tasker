import type { FC, ReactElement } from "react";
import { useEffect, useMemo, useState } from "react";

import { useAppDispatch, useAppSelector } from "00-App/store";
import addSubTodoIcon from "05-Shared/assets/svg/add-icon.svg";
import SubTodoModel from "03-Features/Todo/models/SubTodoModel";
import { addSubTodo } from "03-Features/Todo/models/SubTodoSlice";
import { Button, ETypeButtonStyle, ETypeSizeButtom } from "05-Shared/ui/Button";

import TodoModel from "../../models/TodoModel";
import TodoEditForm from "../TodoEditForm/TodoEditForm";
import type { TSubTodo, TTodo } from "../../models/type";
import TodoItemButtons from "../TodoItemButtons/TodoItemButtons";

import "./_style.scss";

interface IProps {
  id: number;
  pinnedId?: number;
  task: string;
}

const TodoItem: FC<IProps> = ({ id, pinnedId, task }): ReactElement => {
  const [isActiveEdit, setIsActiveEdit] = useState<boolean>(false);
  const [isMouseEnter, setIsMouseEnter] = useState<boolean>(false);

  const subTodos: TSubTodo[] = useAppSelector((state) => state.subTodos.subTodos);
  const dispatch = useAppDispatch();

  // Создаем модель Todo
  const todoModel: TodoModel | SubTodoModel = useMemo((): TodoModel | SubTodoModel => {
    // Если передали pinnedId то создаем подзадачу
    if (pinnedId) {
      return new SubTodoModel({ id: id, pinnedId: pinnedId, task: task });
    }
    // Если не передали pinnedId то создаем задачу
    else {
      return new TodoModel({ id: id, task: task });
    }
  }, [id, pinnedId, task]);

  // Запрашиваем объект Todo
  const todo: TTodo | TSubTodo = useMemo((): TTodo | TSubTodo => {
    // Если была создана модель подзадачи то берем её объект
    if (todoModel instanceof SubTodoModel) {
      return todoModel.getSubTodo;
    }
    // Если была создана модель задачи то берем её объект
    else {
      return todoModel.getTodo;
    }
  }, [todoModel]);

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
    // Создаем новый уникальный id для Todo
    const newSubTodoId: number = subTodos.length === 0 ? 0 : subTodos[subTodos.length - 1].id + 1;

    // Создаем новый объект Todo
    const newSubTodo: TSubTodo = new SubTodoModel({
      id: newSubTodoId,
      pinnedId: todo.id,
      task: "Напиши подзадачу тут",
    }).getSubTodo;

    dispatch(addSubTodo(newSubTodo));
  };

  return (
    <>
      {/* Кнопки для взаимодействия с карточкой задачи */}
      <TodoItemButtons
        isActiveEdit={isActiveEdit}
        setIsActiveEdit={setIsActiveEdit}
        todoId={todo.id}
        isSubTodo={pinnedId ? true : false}
      />
      <article
        className={pinnedId ? "todo-item__todo subtodo" : "todo-item__todo"}
        onMouseEnter={
          !pinnedId
            ? (): void => {
                setIsMouseEnter(true);
              }
            : undefined
        }
        onMouseLeave={
          !pinnedId
            ? (): void => {
                setIsMouseEnter(false);
              }
            : undefined
        }>
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

export default TodoItem;
