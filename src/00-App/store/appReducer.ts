import { combineReducers } from "@reduxjs/toolkit";
import TodoSlice from "02-Widgets/Todo/models/TodoSlice";

export const rootReducer = combineReducers({
  todos: TodoSlice,
});
