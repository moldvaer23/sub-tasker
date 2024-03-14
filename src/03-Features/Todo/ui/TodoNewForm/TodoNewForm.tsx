import { useEffect, useState } from "react";
import type { ChangeEvent, FC, MouseEvent, ReactElement } from "react";

import validator from "05-Shared/utils/validator";
import { ETypeInput, Input } from "05-Shared/ui/Input";
import { Button, ETypeButton, ETypeButtonStyle, ETypeSizeButtom } from "05-Shared/ui/Button";
import { useAppDispatch, useAppSelector } from "00-App/store";

import TodoModel from "../../models/TodoModel";
import type { TTodo } from "../../models/type";
import { addTodo } from "../../models/TodoSlice";

import "./_style.scss";
import { ErrorAlert } from "05-Shared/ui/ErrorAlert";

const TodoNewForm: FC = (): ReactElement => {
  const [task, setTask] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const todos: TTodo[] = useAppSelector((state) => state.todos.todos);
  const dispatch = useAppDispatch();

  useEffect((): void => {
    validator({ data: task, setError: setError, setErrorMessage: setErrorMessage });
  }, [task]);

  const handleSubmit = (): void => {
    // Создаем новый уникальный id для Todo
    const newTodoId: number = todos.length === 0 ? 0 : todos[todos.length - 1].id + 1;

    // Создаем новый объект Todo
    const newTodo: TTodo = new TodoModel({ id: newTodoId, task: task }).getTodo;

    dispatch(addTodo(newTodo));

    // Обнуляем значение поля Task
    setTask("");
  };

  return (
    <form className="section-todos__form-new-todo">
      <label className="form-new-todo__label" htmlFor="task">
        <span className="form-new-todo__label-head">У тебя новая задача?</span>
        <Input
          className="form-new-todo__input"
          name="task"
          placeholder="Напиши её тут"
          type={ETypeInput.text}
          value={task}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>): void => setTask(e.target.value)}
        />
        {error && <ErrorAlert errorMessage={errorMessage} />}
      </label>

      <Button
        className="form-new-todo__button-submit"
        text="Добавить"
        type={ETypeButton.submit}
        typeStyle={ETypeButtonStyle.accent}
        typeSize={ETypeSizeButtom.large}
        onClick={(e: MouseEvent<HTMLButtonElement>): void => {
          e.preventDefault();
          handleSubmit();
        }}
        disabled={error}
      />
    </form>
  );
};

export default TodoNewForm;
