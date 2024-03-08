import {
  ChangeEvent,
  Dispatch,
  FC,
  MouseEvent,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { useAppDispatch } from "00-App/store";
import validator from "05-Shared/utils/validator";
import { ETypeInput, Input } from "05-Shared/ui/Input";
import { Button, ETypeButton } from "05-Shared/ui/Button";

import { TTodo } from "../../models/type";
import TodoModel from "../../models/TodoModel";
import { updateTodo } from "../../models/TodoSlice";

interface IProps {
  todoModel: TodoModel;
  setIsActiveEdit: Dispatch<SetStateAction<boolean>>;
  placeholderTask: string;
}

const TodoEditForm: FC<IProps> = ({
  todoModel,
  setIsActiveEdit,
  placeholderTask,
}): ReactElement => {
  const [changedTask, setChangedTask] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const dispath = useAppDispatch();

  // Валидируем поле chgangeTask
  useEffect((): void => {
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
        onClick={(e: MouseEvent<HTMLButtonElement>): void => {
          e.preventDefault();
          handleSumbit();
        }}
        disabled={error}
      />
    </form>
  );
};

export default TodoEditForm;
