import { useAppDispatch } from "00-App/store";
import TodoModel from "03-Features/Todo/models/TodoModel";
import { updateTodo } from "03-Features/Todo/models/TodoSlice";
import { TTodo } from "03-Features/Todo/models/type";
import { Button, ETypeButton } from "05-Shared/ui/Button";
import { ETypeInput, Input } from "05-Shared/ui/Input";
import validator from "05-Shared/utils/validator";
import { ChangeEvent, FC, useEffect, useState } from "react";

interface IProps {
  todoModel: TodoModel;
  setIsActiveEdit: Function;
  placeholderTask: string;
}

const TodoEditForm: FC<IProps> = ({ todoModel, setIsActiveEdit, placeholderTask }) => {
  const [changedTask, setChangedTask] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const dispath = useAppDispatch();

  // Валидируем поле chgangeTask
  useEffect(() => {
    validator({ data: changedTask, setError: setError });
  }, [changedTask]);

  const handleSumbit = (): void => {
    const updatedTodo: TTodo = todoModel.changeTask(changedTask).getTodo;

    dispath(updateTodo(updatedTodo));
    setIsActiveEdit(false);
  };

  return (
    <form>
      <Button text="x" onClick={(): void => setIsActiveEdit(false)} />

      <Input
        name="changeTask"
        placeholder={placeholderTask}
        type={ETypeInput.text}
        onChange={(e: ChangeEvent<HTMLInputElement>): void => setChangedTask(e.target.value)}
      />

      <Button
        text="Применить"
        type={ETypeButton.submit}
        onClick={(e: MouseEvent): void => {
          e.preventDefault();
          handleSumbit();
        }}
        disabled={error}
      />
    </form>
  );
};

export default TodoEditForm;
