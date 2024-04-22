import { FC } from 'react'

import { TField } from '05-Shared/types'
import { useAppDispatch } from '00-App/store'
import { FieldsList } from '03-Features/FieldsList'

import FieldsModel from '../../models/FieldsModel'

const Fields: FC = () => {
	const dispatch = useAppDispatch()
	const fieldsModel = new FieldsModel({ dispatch: dispatch })

	/*
	 * Хендлеры для работы с моделью полей
	 */

	// Хендлер установки активного поля
	const setActiveField = (uuid: string) => {
		fieldsModel.setActiveField(uuid)
	}

	// Хендлер инициализации полей
	const setFields = (fields: TField[]) => {
		fieldsModel.setFields(fields)
	}

	// Хендлер создания нового поля
	const createNewField = (data: { name: string; uuidTodos?: string }) => {
		return fieldsModel.createField({
			name: data.name,
			uuidTodos: data.uuidTodos,
		})
	}

	// Хендлер редактирования поля
	const editFieldName = (data: { uuid: string; name: string }) => {
		fieldsModel.editFieldName({ uuid: data.uuid, name: data.name })
	}

	// Хендлер удаления поля
	const deleteField = (data: { uuid: string; uuidTodos: string }) => {
		fieldsModel.deleteField({ uuid: data.uuid, uuidTodos: data.uuidTodos })
	}

	return (
		<>
			<FieldsList
				createNewField={createNewField}
				deleteField={deleteField}
				editFieldName={editFieldName}
				setActiveField={setActiveField}
				setFields={setFields}
			/>
		</>
	)
}

export default Fields
