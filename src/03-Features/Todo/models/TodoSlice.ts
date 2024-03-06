import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TTodo } from "./type";

interface TodosState {
  todos: TTodo[];
}

const initialState: TodosState = {
  todos: [],
};

const saveLocalStorage = (todos: TTodo[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<TTodo>) {
      state.todos.push(action.payload);
      saveLocalStorage(state.todos);
    },
    // Нужен для инициализации приложения, по этому не сохраняем в localStorage
    setTodos(state, action: PayloadAction<TTodo[]>) {
      state.todos = action.payload;
    },
  },
});

export const { addTodo, setTodos } = todosSlice.actions;
export default todosSlice.reducer;
