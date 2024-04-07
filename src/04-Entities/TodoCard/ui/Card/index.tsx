import { FC, useEffect, useState } from "react";

import { addIconDefault } from "05-Shared/assets/svg";
import { Button, ETypeButtonSize, ETypeButtonStyle } from "05-Shared/ui/Button";

import TodoButtons from "../Buttons";
import TodoEditForm from "../EditForm";

import "./_style.scss";

interface IProps {
  handleCreateSubTodo?: () => void;
  handleDelete: () => void;
  handleSubmit: (changeTask: string) => void;
  isSubTodo?: boolean;
  task: string;
}

const TodoCard: FC<IProps> = ({
  handleCreateSubTodo,
  handleDelete,
  handleSubmit,
  isSubTodo,
  task,
}) => {
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
            placeholderTask={task}
            setIsActiveEdit={setIsActiveEdit}
            submitHandle={handleSubmit}
          />
        ) : (
          // Показываем текст задачи
          <p className="todo__task">{task}</p>
        )}

        {!isSubTodo && handleCreateSubTodo && (
          <Button
            className="todo__button-new-subtodo"
            disabled={isActiveEdit}
            image={{ imageSrc: addIconDefault, alt: "Кнопка добавить подзадачу" }}
            onClick={handleCreateSubTodo}
            opacity={!isActiveEdit && isMouseEnter ? 1 : 0}
            typeSize={ETypeButtonSize.small}
            typeStyle={ETypeButtonStyle.icon}
          />
        )}
      </article>
    </>
  );
};

export default TodoCard;
