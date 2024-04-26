import { FC, useEffect } from 'react'

import { Home } from '01-Pages/Home'
import { TField, TTodo } from '05-Shared/types'
import {
	addTodo,
	setTodos,
	setUuidTodos,
} from '02-Widgets/Todo/models/TodoSlice'
import {
	createField,
	setActiveField,
	setFields,
} from '02-Widgets/Fields/models/FieldsSlice'

import { useAppDispatch, useAppSelector } from './store'

import './styles/global.scss'
import { buildConfig } from './config/AppConfig'

/**
 * (App)\
 * \
 * Функциональный компонент APP, точка входа.
 */
const App: FC = () => {
	const storeActiveField = useAppSelector((state) => state.fields.activeField)
	const dispatch = useAppDispatch()

	// Инициализация приложения из LocalStorage
	useEffect(() => {
		const localActiveField = localStorage.getItem('activeField') as string

		if (localActiveField) {
			dispatch(setActiveField(localActiveField))
		}
		// Если активного поля нету то проводим инициализацию конфига
		else {
			const { configField, configTodo, configUuidTodos } = buildConfig()

			dispatch(setUuidTodos(configUuidTodos))
			dispatch(addTodo(configTodo))

			localStorage.setItem('activeField', configField.uuid)
			dispatch(createField(configField))
			dispatch(setActiveField(configField.uuid))
		}
	}, [dispatch])

	// Рендер приложения при изменении активного поля
	useEffect(() => {
		if (storeActiveField.length !== 0) {
			// Получаем поля из LocalStorage
			const localFields: Record<string, TField> | undefined = JSON.parse(
				localStorage.getItem('fields') as string
			)

			// Если поля и активное поле не пустые
			if (storeActiveField && localFields) {
				// Если в полях есть uuid активного поля то выполняем рендер
				if (Object.keys(localFields).includes(storeActiveField)) {
					dispatch(setFields(Object.values(localFields)))

					const field = localFields[storeActiveField]

					const localTodos: Record<string, TTodo> | null = JSON.parse(
						localStorage.getItem(field.uuidTodos) as string
					)

					// Если нашли задачи по uuid
					if (localTodos) {
						dispatch(setUuidTodos(field.uuidTodos))
						dispatch(setTodos(localTodos))
					}
				}
			} else {
				console.error('Error: Empty todos & fields')
			}
		}
	}, [storeActiveField, dispatch])

	// Показываем информацию о разработчике при открытии приложения
	useEffect(() => {
		console.log(`
███╗   ███╗ ██████╗ ██╗     ██████╗ ██╗   ██╗ █████╗ ███████╗██████╗ 
████╗ ████║██╔═══██╗██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝██╔══██╗
██╔████╔██║██║   ██║██║     ██║  ██║██║   ██║███████║█████╗  ██████╔╝
██║╚██╔╝██║██║   ██║██║     ██║  ██║╚██╗ ██╔╝██╔══██║██╔══╝  ██╔══██╗
██║ ╚═╝ ██║╚██████╔╝███████╗██████╔╝ ╚████╔╝ ██║  ██║███████╗██║  ██║
╚═╝     ╚═╝ ╚═════╝ ╚══════╝╚═════╝   ╚═══╝  ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝`)

		console.log('⚠ GitHub: https://github.com/moldvaer23')
		console.log('⚠ Email: moldvaer33@gmail.com')
	}, [])

	return (
		<>
			<Home />
		</>
	)
}

export default App
