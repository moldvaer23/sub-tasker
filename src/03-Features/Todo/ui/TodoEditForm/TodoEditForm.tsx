import { useAppDispatch } from "00-App/store";
import TodoModel from "03-Features/Todo/models/TodoModel";
import { updateTodo } from "03-Features/Todo/models/TodoSlice";
import { TTodo } from "03-Features/Todo/models/type";
import validator from "05-Shared/utils/validator";
import { FC, useEffect, useState } from "react";

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
      <button type="button" onClick={() => setIsActiveEdit(false)}>
        x
      </button>
      <input
        type="text"
        placeholder={placeholderTask}
        onChange={(e) => setChangedTask(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          handleSumbit();
        }}
        disabled={error}>
        Применить
      </button>
    </form>
  );
};

export default TodoEditForm;
