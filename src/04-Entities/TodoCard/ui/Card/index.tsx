import { FC, useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

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
  const [isActiveEdit, setIsActiveEdit] = useState<boolean>(task.length !== 0 ? false : true);
  const [isMouseEnter, setIsMouseEnter] = useState<boolean>(false);

  // Хендлер закрытия формы редактирования задачи
  const handleCloseEdit = () => {
    if (task.length === 0) handleDelete();

    setIsActiveEdit(false);
  };

  // Вешаем и снимаем слушатели формы редактирования Todo
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent): void => {
      if (e.code === "Escape") handleCloseEdit();
    };

    if (isActiveEdit) document.addEventListener("keydown", handleEsc);

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
          handleOpenEdit={() => setIsActiveEdit(true)}
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
      </motion.article>
    </AnimatePresence>
  );
};

export default TodoCard;
