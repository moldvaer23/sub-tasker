import { useEffect, useState } from "react";
import type { ChangeEvent, FC, ReactElement } from "react";

import { useAppDispatch } from "00-App/store";
import validator from "05-Shared/utils/validator";
import { TextArea } from "05-Shared/ui/TeaxtArea";
import { ErrorAlert } from "05-Shared/ui/ErrorAlert";
import checkIcon from "05-Shared/assets/svg/check-icon.svg";
import SubTodoModel from "03-Features/Todo/models/SubTodoModel";
import MainTodoModel from "03-Features/Todo/models/MainTodoModel";
import { Button, ETypeButton, ETypeButtonStyle } from "05-Shared/ui/Button";

import { updateSubTodo, updateTodo } from "../../models/TodoSlice";

import "./_style.scss";

interface IProps {
  placeholderTask: string;
  todoModel: MainTodoModel | SubTodoModel;
  setIsActiveEdit: (isActiveEdit: boolean) => void;
}

const TodoEditForm: FC<IProps> = ({
  placeholderTask,
  todoModel,
  setIsActiveEdit,
}): ReactElement => {
  const [changedTask, setChangedTask] = useState<string>(placeholderTask);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const dispatch = useAppDispatch();

  // Валидируем поле chgangeTask
  useEffect(() => {
    validator({ data: changedTask, setError: setError, setErrorMessage: setErrorMessage });
  }, [changedTask]);

  // Хендлер подтверждения формы
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!error) {
      if (todoModel instanceof MainTodoModel) {
        todoModel.task = changedTask;

        dispatch(
          updateTodo({
            uuid: todoModel.uuid,
            task: todoModel.task,
          })
        );
      }

      if (todoModel instanceof SubTodoModel) {
        todoModel.task = changedTask;

        dispatch(
          updateSubTodo({
            uuidPinTodo: todoModel.uuidPinTodo,
            uuidSubTodo: todoModel.uuid,
            task: todoModel.task,
          })
        );
      }

      setIsActiveEdit(false);
    }
  };

  return (
    <form className="todo__form-edit-todo" onSubmit={handleSubmit}>
      {errorMessage.length > 0 && <ErrorAlert errorMessage={errorMessage} />}

      <TextArea
        className="form-edit-todo__textarea"
        name="changeTask"
        value={changedTask}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => setChangedTask(e.target.value)}
      />

      <Button
        className="form-edit-todo__button-submit"
        image={{
          imageSrc: checkIcon,
          alt: "Кнопка подтвердить",
        }}
        type={ETypeButton.submit}
        typeStyle={ETypeButtonStyle.icon}
      />
    </form>
  );
};

export default TodoEditForm;
