import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TTodo } from "./type";

interface TodosState {
  todos: TTodo[];
}

const initialState: TodosState = {
  todos: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // Добавление новой задачи в конец
    addTodo(state, action: PayloadAction<TTodo>) {
      state.todos.push(action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    // Нужен для инициализации приложения, по этому не сохраняем в localStorage
    setTodos(state, action: PayloadAction<TTodo[]>) {
      state.todos = action.payload;
    },
    // Обновление задачи с поиском по id
    updateTodo(state, action: PayloadAction<TTodo>) {
      state.todos.forEach((todo) => {
        if (todo.id === action.payload.id) {
          todo.task = action.payload.task;
          localStorage.setItem("todos", JSON.stringify(state.todos));
        }
      });
    },
    // Удаление задачи по id
    deleteTodo(state, action: PayloadAction<number>) {
      state.todos.forEach((todo, index) => {
        if (todo.id === action.payload) {
          state.todos.splice(index, 1);
          localStorage.setItem("todos", JSON.stringify(state.todos));
        }
      });
    },
  },
});

export const { addTodo, setTodos, updateTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
