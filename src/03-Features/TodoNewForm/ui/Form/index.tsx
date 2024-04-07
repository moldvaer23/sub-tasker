import { useEffect, useState } from "react";
import type { ChangeEvent, FC, ReactElement } from "react";

import validator from "05-Shared/utils/validator";
import { ErrorAlert } from "05-Shared/ui/ErrorAlert";
import { ETypeInput, Input } from "05-Shared/ui/Input";
import { Button, ETypeButton, ETypeButtonStyle } from "05-Shared/ui/Button";

import addIcon from "05-Shared/assets/svg/add-plus-icon.svg";

import "./_style.scss";

interface IProps {
  createNewTodo: (task: string) => void;
}

const TodoNewForm: FC<IProps> = ({ createNewTodo }): ReactElement => {
  const [task, setTask] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Валидируем поле task
  useEffect((): void => {
    validator({ data: task, setError: setError, setErrorMessage: setErrorMessage });
  }, [task]);

  // Хендлер подтверждения формы
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!error) {
      // Создаем новую модель главной задачи
      createNewTodo(task);

      // Обнуляем поле формы
      setTask("");
    }
  };

  return (
    <form className="form-new-todo" name="new-todo" id="new-todo" onSubmit={handleSubmit}>
      <label className="form-new-todo__label" htmlFor="new-todo">
        <span className="form-new-todo__label-span">У тебя новая задача?</span>
        <Input
          className="form-new-todo__input"
          name="new-todo"
          placeholder="Напиши её тут"
          type={ETypeInput.text}
          value={task}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>): void => setTask(e.target.value)}
        />
        {errorMessage.length > 0 && <ErrorAlert errorMessage={errorMessage} />}
      </label>

      <Button
        className="form-new-todo__button-submit"
        type={ETypeButton.submit}
        typeStyle={ETypeButtonStyle.icon}
        image={{
          alt: "Добавить задачу",
          imageSrc: addIcon,
        }}
        animate={false}
        disabled={error}
      />
    </form>
  );
};

export default TodoNewForm;
