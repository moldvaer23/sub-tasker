import { TField } from "05-Shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IFieldsState {
  acitveField: string;
  fields: Record<string, TField>;
}

const initialState: IFieldsState = {
  acitveField: "", // uuid активного поля
  fields: {}, // Поля
};

const fieldsSlice = createSlice({
  name: "fields",
  initialState,
  reducers: {
    // Установка активного поля
    setActiveField(state, action: PayloadAction<string>) {
      state.acitveField = action.payload;
    },

    // Инициализация полей
    setFields(state, action: PayloadAction<TField[]>) {
      const fields = action.payload;

      fields.map((field) => {
        state.fields[field.uuid] = field;
      });
    },

    // Создания поля
    createField(state, action: PayloadAction<TField>) {
      const field = action.payload;

      state.fields[field.uuid] = field;
      localStorage.setItem("fields", JSON.stringify(state.fields));
    },

    // Редактирование имени поля
    editFieldName(state, action: PayloadAction<{ uuid: string; name: string }>) {
      state.fields[action.payload.uuid].name = action.payload.name;
      localStorage.setItem("fields", JSON.stringify(state.fields));
    },

    // Удаление поля
    deleteField(state, action: PayloadAction<{ uuid: string; uuidTodos: string }>) {
      delete state.fields[action.payload.uuid];

      localStorage.setItem("fields", JSON.stringify(state.fields));
      localStorage.removeItem(action.payload.uuidTodos);
    },
  },
});

export const { setActiveField, setFields, createField, editFieldName, deleteField } =
  fieldsSlice.actions;

export default fieldsSlice.reducer;
