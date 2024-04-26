import { TField, TSubTodo, TTodo } from '05-Shared/types'
import { v4 as uuidv4 } from 'uuid'

export const buildConfig = () => {
	const subTodos: Record<string, TSubTodo> = {}

	const configTodo: TTodo = {
		important: true,
		subTodos: subTodos,
		task: 'Начать работу',
		uuid: uuidv4(),
	}

	const uuid1 = uuidv4()

	subTodos[uuid1] = {
		important: true,
		task: 'Создать свой первый лист',
		uuid: uuid1,
		uuidPinTodo: configTodo.uuid,
	}

	const uuid2 = uuidv4()

	subTodos[uuid2] = {
		important: true,
		task: 'Создать свою первую задачу',
		uuid: uuid2,
		uuidPinTodo: configTodo.uuid,
	}

	const uuid3 = uuidv4()

	subTodos[uuid3] = {
		important: true,
		task: 'Создать свою первую подзадачу',
		uuid: uuid3,
		uuidPinTodo: configTodo.uuid,
	}

	const configUuidTodos: string = uuidv4()

	const configField: TField = {
		name: 'Ваше первое поле',
		uuid: uuidv4(),
		uuidTodos: configUuidTodos,
	}

	return {
		configTodo: configTodo,
		configField: configField,
		configUuidTodos: configUuidTodos,
	}
}
