import { FC, useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { addIconDefault, starIcon } from "05-Shared/assets/svg";
import { Button, ETypeButtonSize, ETypeButtonStyle } from "05-Shared/ui/Button";

import TodoButtons from "../Buttons";
import TodoEditForm from "../EditForm";

import "./_style.scss";

interface IProps {
  handleClearActiveEdit: () => void;
  handleCreateSubTodo?: () => void;
  handleDelete: () => void;
  handleSetActiveEdit: () => void;
  handleSetImportant: (value: boolean) => void;
  handleSubmit: (changeTask: string) => void;
  important: boolean;
  isSubTodo?: boolean;
  task: string;
  uuidActiveEditTodo: string;
}

const TodoCard: FC<IProps> = ({
  handleClearActiveEdit,
  handleCreateSubTodo,
  handleDelete,
  handleSetActiveEdit,
  handleSetImportant,
  handleSubmit,
  important,
  isSubTodo,
  task,
  uuidActiveEditTodo,
}) => {
  const [isActiveEdit, setIsActiveEdit] = useState<boolean>(task.length !== 0 ? false : true);
  const [isMouseEnter, setIsMouseEnter] = useState<boolean>(false);

  // Хендлер закрытия формы редактирования задачи
  const handleCloseEdit = () => {
    if (task.length === 0) {
      if (isActiveEdit) handleClearActiveEdit();
      return handleDelete();
    }

    handleClearActiveEdit();
    setIsActiveEdit(false);
  };

  // Вешаем и снимаем слушатели формы редактирования Todo
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent): void => {
      if (e.code === "Escape") handleCloseEdit();
    };

    if (isActiveEdit) {
      if (uuidActiveEditTodo.length === 0) handleSetActiveEdit();

      document.addEventListener("keydown", handleEsc);
    }

    return () => document.removeEventListener("keydown", handleEsc);

    // eslint-disable-next-line
  }, [isActiveEdit]);

  return (
    <AnimatePresence>
      <motion.article
        className={isSubTodo ? " subtodo todo" : "todo"}
        initial={{ scale: 0, opacity: 0 }}
        onMouseEnter={() => setIsMouseEnter(true)}
        onMouseLeave={() => setIsMouseEnter(false)}
        transition={{ duration: 0.3 }}
        whileInView={{ scale: 1, opacity: 1 }}>
        <TodoButtons
          handleCloseEdit={handleCloseEdit}
          handleDelete={handleDelete}
          handleOpenEdit={() => {
            if (uuidActiveEditTodo.length === 0) {
              handleSetActiveEdit();
              setIsActiveEdit(true);
            }
          }}
          disabled={uuidActiveEditTodo.length === 0 ? false : true}
          isActiveEdit={isActiveEdit}
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

        {!isActiveEdit && (
          <Button
            className="todo__button-important"
            image={{ imageSrc: starIcon, alt: "Важное" }}
            onClick={() => handleSetImportant(!important)}
            opacity={!important ? (isMouseEnter ? 1 : 0) : 1}
            typeSize={ETypeButtonSize.small}
            typeStyle={ETypeButtonStyle.icon}
          />
        )}

        {!isSubTodo && handleCreateSubTodo && (
          <Button
            className="todo__button-new-subtodo"
            disabled={uuidActiveEditTodo.length === 0 ? false : true}
            image={{ imageSrc: addIconDefault, alt: "Кнопка добавить подзадачу" }}
            onClick={handleCreateSubTodo}
            opacity={!isActiveEdit && isMouseEnter ? 1 : 0}
            typeSize={ETypeButtonSize.small}
            typeStyle={ETypeButtonStyle.icon}
          />
        )}
      </motion.article>
    </AnimatePresence>
  );
};

export default TodoCard;
