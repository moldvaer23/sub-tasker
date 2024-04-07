import { useEffect, useState } from "react";
import type { FC, ReactElement } from "react";

import addSubTodoIcon from "05-Shared/assets/svg/add-icon.svg";
import { Button, ETypeButtonStyle, ETypeButtonSize } from "05-Shared/ui/Button";

import TodoButtons from "../Buttons";
import TodoEditForm from "../EditForm";

import "./_style.scss";

interface IProps {
  task: string;
  handleDelete: () => void;
  handleSubmit: (changeTask: string) => void;
  handleCreateSubTodo?: () => void;
  isSubTodo?: boolean;
}

const TodoCard: FC<IProps> = ({
  task,
  isSubTodo,
  handleDelete,
  handleSubmit,
  handleCreateSubTodo,
}): ReactElement => {
  const [isActiveEdit, setIsActiveEdit] = useState<boolean>(false);
  const [isMouseEnter, setIsMouseEnter] = useState<boolean>(false);

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
      <article
        className={isSubTodo ? " subtodo todo" : "todo"}
        onMouseEnter={() => setIsMouseEnter(true)}
        onMouseLeave={() => setIsMouseEnter(false)}>
        <TodoButtons
          handleDelete={handleDelete}
          isActiveEdit={isActiveEdit}
          setIsActiveEdit={setIsActiveEdit}
        />

        {isActiveEdit ? (
          // Показываем форму редактирования
          <TodoEditForm
            submitHandle={handleSubmit}
            placeholderTask={task}
            setIsActiveEdit={setIsActiveEdit}
          />
        ) : (
          // Показываем текст задачи
          <p className="todo__task">{task}</p>
        )}

        {!isSubTodo && handleCreateSubTodo && (
          <Button
            className="todo__button-new-subtodo"
            image={{ imageSrc: addSubTodoIcon, alt: "Кнопка добавить подзадачу" }}
            typeStyle={ETypeButtonStyle.icon}
            typeSize={ETypeButtonSize.small}
            onClick={handleCreateSubTodo}
            opacity={!isActiveEdit && isMouseEnter ? 1 : 0}
            disabled={isActiveEdit}
          />
        )}
      </article>
    </>
  );
};

export default TodoCard;
