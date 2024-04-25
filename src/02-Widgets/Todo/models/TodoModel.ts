import { v4 as uuidv4 } from 'uuid'

import { AppDispatch } from '00-App/store'
import { ITodoModel, TSubTodo, TTodo } from '05-Shared/types'

import {
	addSubTodo,
	addTodo,
	deleteSubTodo,
	deleteTodo,
	setActiveEdit,
	setImportantSubTodo,
	setImportantTodo,
	updateSubTodo,
	updateTodo,
} from './TodoSlice'

/**
 * (Model)\
 * \
 * Класс задачи.
 */
class TodoModel implements ITodoModel {
	protected _uuid: string
	protected _important: boolean
	protected _task: string
	protected _subTodos: Record<string, TSubTodo> = {}

	constructor(
		protected props: {
			uuid?: string
			task: string
			important?: boolean
			dispatch: AppDispatch
		}
	) {
		this._uuid = props.uuid ? props.uuid : uuidv4()
		this._important = props.important || false
		this._task = props.task

		// Если это новая задача пушим в state
		if (!props.uuid) {
			props.dispatch(
				addTodo({
					uuid: this._uuid,
					important: this._important,
					task: this._task,
					subTodos: this._subTodos,
				})
			)
		}
	}

	// Создание подзадачи
	public createSubTodo = (data: {
		uuid?: string
		important?: boolean
		task: string
	}): TSubTodo => {
		const uuidSubTodo = data.uuid ? data.uuid : uuidv4()

		const subTodoObj: TSubTodo = {
			uuidPinTodo: this._uuid,
			uuid: uuidSubTodo,
			important: data.important || false,
			task: data.task,
		}

		this._subTodos[uuidSubTodo] = subTodoObj

		if (!data.uuid) {
			// Пушим в state
			this.props.dispatch(
				addSubTodo({
					uuidPinTodo: this._uuid,
					subTodo: subTodoObj,
				})
			)
		}

		return subTodoObj
	}

	// Редактирование задачи
	public editTodo = (data: {
		uuid: string
		task: string
	}): void | undefined => {
		if (data.uuid !== this._uuid) return undefined
		this._task = data.task

		// Пушим в state
		this.props.dispatch(
			updateTodo({
				uuid: this._uuid,
				task: this._task,
			})
		)
	}

	// Установка uuid задачи которая редактируется
	public setActiveEdit = (uuid: string) => {
		this.props.dispatch(setActiveEdit(uuid))
	}

	// Устанавливает пометку важное у задачи
	public setImportantTodo = (value: boolean) => {
		this._important = value

		this.props.dispatch(setImportantTodo({ uuid: this._uuid, value: value }))
	}

	// Устанавливает пометку важное у подзадачи
	public setImportantSubTodo = (data: { uuid: string; value: boolean }) => {
		this._subTodos[data.uuid].important = data.value

		this.props.dispatch(
			setImportantSubTodo({
				uuidPinTodo: this._uuid,
				uuidSubTodo: data.uuid,
				value: data.value,
			})
		)
	}

	// Редактирование подзадачи
	public editSubTodo = (data: {
		uuid: string
		task: string
	}): void | undefined => {
		const subTodo = this._subTodos[data.uuid]
		if (subTodo === undefined) return undefined
		subTodo.task = data.task

		// Пушим в state
		this.props.dispatch(
			updateSubTodo({
				uuidSubTodo: subTodo.uuid,
				uuidPinTodo: subTodo.uuidPinTodo,
				task: subTodo.task,
			})
		)
	}

	// Удаление задачи
	public deleteTodo = () => {
		this.props.dispatch(deleteTodo(this._uuid))
	}

	// Удаление подзадачи
	public deleteSubTodo = (data: {
		uuidPinTodo: string
		uuidSubTodo: string
	}) => {
		// Удаляем подзадачу
		delete this._subTodos[data.uuidPinTodo]

		// Удаляем подзадачу из state
		this.props.dispatch(
			deleteSubTodo({
				uuidSubTodo: data.uuidSubTodo,
				uuidPinTodo: data.uuidPinTodo,
			})
		)
	}

	// Получение задачи
	public getTodo = (): TTodo => {
		return {
			uuid: this._uuid,
			important: this._important,
			task: this._task,
			subTodos: this._subTodos,
		}
	}

	// Получение подзадач
	public getSubTodos = (): TSubTodo[] => {
		return Object.values(this._subTodos)
	}

	public get uuid() {
		return this._uuid
	}
}

export default TodoModel
