import { FC, useEffect } from 'react'

import { Home } from '01-Pages/Home'
import { TField, TTodo } from '05-Shared/types'
import { setTodos, setUuidTodos } from '02-Widgets/Todo/models/TodoSlice'
import { setActiveField, setFields } from '02-Widgets/Fields/models/FieldsSlice'

import { useAppDispatch, useAppSelector } from './store'

import './styles/global.scss'

const App: FC = () => {
	const storeActiveField = useAppSelector((state) => state.fields.activeField)
	const dispatch = useAppDispatch()

	/*
	 * Инициализация приложения из LocalStorage
	 */
	useEffect(() => {
		const localActiveField = localStorage.getItem('activeField') as string

		if (localActiveField) {
			dispatch(setActiveField(localActiveField))
		}
	})

	/*
	 * Рендер приложения при изминении активного поля
	 */
	useEffect(() => {
		if (storeActiveField.length !== 0) {
			// Получаем поля из LocalStorage
			const localFields: Record<string, TField> | undefined = JSON.parse(
				localStorage.getItem('fields') as string
			)

			// Если поля и активное поле не пустые
			if (storeActiveField && localFields) {
				// Если в полях есть uuid активного поля то рендерим
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

	return (
		<>
			<Home />
		</>
	)
}

export default App
