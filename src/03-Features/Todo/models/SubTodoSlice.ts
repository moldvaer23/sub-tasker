import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { TSubTodo } from "./type";

interface ISubTodosState {
  subTodos: TSubTodo[];
}

const initialState: ISubTodosState = {
  subTodos: [],
};

const subTodosSlice = createSlice({
  name: "subTodos",
  initialState,
  reducers: {
    // Добавление новой задачи в конец
    addSubTodo(state, action: PayloadAction<TSubTodo>) {
      state.subTodos.push(action.payload);
      localStorage.setItem("subTodos", JSON.stringify(state.subTodos));
    },
    // Нужен для инициализации приложения, по этому не сохраняем в localStorage
    setSubTodos(state, action: PayloadAction<TSubTodo[]>) {
      state.subTodos = action.payload;
    },
    // Обновление задачи с поиском по id
    updateSubTodo(state, action: PayloadAction<TSubTodo>) {
      state.subTodos.forEach((subTodo) => {
        if (subTodo.id === action.payload.id) {
          subTodo.task = action.payload.task;
          localStorage.setItem("subTodos", JSON.stringify(state.subTodos));
        }
      });
    },
    // Удаление задачи по id
    deleteSubTodo(state, action: PayloadAction<number>) {
      state.subTodos.forEach((subTodo, index) => {
        if (subTodo.id === action.payload) {
          state.subTodos.splice(index, 1);
          localStorage.setItem("subTodos", JSON.stringify(state.subTodos));
        }
      });
    },
  },
});

export const { addSubTodo, deleteSubTodo, setSubTodos, updateSubTodo } = subTodosSlice.actions;
export default subTodosSlice.reducer;
