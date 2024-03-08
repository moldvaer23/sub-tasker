import { ChangeEvent, FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "00-App/store";
import TodoModel from "../../models/TodoModel";
import { addTodo } from "../../models/TodoSlice";
import { TTodo } from "../../models/type";
import validator from "05-Shared/utils/validator";
import { Button, ETypeButton } from "05-Shared/ui/Button";
import { ETypeInput, Input } from "05-Shared/ui/Input";

const TodoNewForm: FC = () => {
  const [task, setTask] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const todos = useAppSelector((state) => state.todos.todos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    validator({ data: task, setError: setError });
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
    <form>
      <label>
        У Вас новая задача?
        <Input
          name="task"
          placeholder="Напиши её тут"
          type={ETypeInput.text}
          value={task}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>): void => setTask(e.target.value)}
        />
      </label>

      <Button
        text="Добавить"
        type={ETypeButton.submit}
        onClick={(e: MouseEvent): void => {
          e.preventDefault();
          handleSubmit();
        }}
        disabled={error}
      />
    </form>
  );
};

export default TodoNewForm;
