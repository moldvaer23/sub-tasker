import { combineReducers } from '@reduxjs/toolkit'

// Reducers
import TodoSlice from '02-Widgets/Todo/models/TodoSlice'
import FieldsSlice from '02-Widgets/Fields/models/FieldsSlice'

export const rootReducer = combineReducers({
	todos: TodoSlice,
	fields: FieldsSlice,
})
