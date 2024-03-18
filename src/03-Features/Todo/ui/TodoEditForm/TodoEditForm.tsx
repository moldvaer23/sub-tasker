import { useEffect, useState } from "react";
import type { ChangeEvent, FC, ReactElement } from "react";

import { useAppDispatch } from "00-App/store";
import validator from "05-Shared/utils/validator";
import { TextArea } from "05-Shared/ui/TeaxtArea";
import { ErrorAlert } from "05-Shared/ui/ErrorAlert";
import SubTodoModel from "03-Features/Todo/models/SubTodoModel";
import MainTodoModel from "03-Features/Todo/models/MainTodoModel";
import { Button, ETypeButton, ETypeButtonStyle, ETypeSizeButtom } from "05-Shared/ui/Button";

import { updateSubTodo, updateTodo } from "../../models/TodoSlice";

import "./_style.scss";

interface IProps {
  todoModel: MainTodoModel | SubTodoModel;
  placeholderTask: string;
  setIsActiveEdit: (isActive: boolean) => void;
}

const TodoEditForm: FC<IProps> = ({
  todoModel,
  placeholderTask,
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
            id: todoModel.id,
            task: todoModel.task,
          })
        );
      }

      if (todoModel instanceof SubTodoModel) {
        todoModel.task = changedTask;
        dispatch(
          updateSubTodo({
            idPinnedTodo: todoModel.idPinnedTodo,
            idSubTodo: todoModel.id,
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
        text="Применить"
        typeSize={ETypeSizeButtom.medium}
        typeStyle={ETypeButtonStyle.primary}
        type={ETypeButton.submit}
        disabled={error}
      />
    </form>
  );
};

export default TodoEditForm;
