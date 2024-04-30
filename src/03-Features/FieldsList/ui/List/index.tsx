import { FC, useState } from 'react'

import clsx from 'clsx'
import { Tooltip } from 'react-tooltip'

import { TField } from '05-Shared/types'
import { Modal } from '04-Entities/Modal'
import { useAppSelector } from '00-App/store'
import { addIconPlus, deleteIcon, editIcon } from '05-Shared/assets/svg'
import { Button, ETypeButtonSize, ETypeButtonStyle } from '05-Shared/ui/Button'

import Form from '../Form'
import style from './_style.module.scss'

interface IProps {
	createNewField: (data: { name: string; uuidTodos?: string }) => TField
	deleteField: (data: { uuid: string; uuidTodos: string }) => void
	editFieldName: (data: { uuid: string; name: string }) => void
	setActiveField: (uuid: string) => void
	setFields: (fields: TField[]) => void
}

/**
 * (Features)\
 * \
 * Функциональный компонент предназначенный для отображения полей с кнопками взаимодействия.
 */
const FieldsList: FC<IProps> = ({
	createNewField,
	deleteField,
	editFieldName,
	setActiveField,
	setFields,
}) => {
	// Состояния статуса модальных окон
	const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false)
	const [openEditField, setOpenEditField] = useState<boolean>(false)
	const [openNewField, setOpenNewField] = useState<boolean>(false)

	const activeField = useAppSelector((state) => state.fields.activeField)
	const activeUuidEditTodo = useAppSelector((state) => state.todos.activeEdit)
	const fieldsStore = useAppSelector((state) => state.fields.fields)

	const fields: TField[] = Object.values(fieldsStore)

	// Инициализируем поля
	if (fields.length !== 0) setFields(fields)

	return (
		<>
			<aside className={style.aside}>
				<div className={style.aside__buttons}>
					<Button
						className={style.aside__button}
						image={{
							alt: 'Добавить новый лист',
							imageSrc: addIconPlus,
						}}
						typeStyle={ETypeButtonStyle.icon}
						onClick={() => setOpenNewField(true)}
						otherSettings={{
							['data-tooltip-id']: 'new-field-tooltip',
							['data-tooltip-content']: 'Новый лист',
						}}
					/>
					<Tooltip variant='light' place='bottom' id='new-field-tooltip' />

					<Button
						className={style.aside__button}
						image={{
							alt: 'Изменить название листа',
							imageSrc: editIcon,
						}}
						typeStyle={ETypeButtonStyle.icon}
						onClick={() => setOpenEditField(true)}
						otherSettings={{
							['data-tooltip-id']: 'edit-field-tooltip',
							['data-tooltip-content']: 'Изменить название поля',
						}}
					/>
					<Tooltip variant='light' place='bottom' id='edit-field-tooltip' />

					<Button
						className={style.aside__button}
						image={{
							alt: 'Удалить лист',
							imageSrc: deleteIcon,
						}}
						typeStyle={ETypeButtonStyle.icon}
						onClick={() => {
							if (fields.length !== 1) setOpenConfirmDelete(true)
						}}
						disabled={fields.length === 1 ? true : false}
						otherSettings={{
							['data-tooltip-id']: 'delete-field-tooltip',
							['data-tooltip-content']: 'Удалить активное поле',
						}}
					/>
					<Tooltip variant='light' place='bottom' id='delete-field-tooltip' />
				</div>
				<ul className={style.list}>
					{fields.length !== 0 &&
						fields.map((field, index) => {
							return (
								<li key={index}>
									<Button
										text={field.name}
										className={clsx(style.list__button, {
											[style.field__active]: field.uuid === activeField,
										})}
										typeStyle={ETypeButtonStyle.primary}
										typeSize={ETypeButtonSize.medium}
										onClick={
											field.uuid !== activeField
												? () => {
														setActiveField(field.uuid)
													}
												: undefined
										}
										disabled={activeUuidEditTodo.length !== 0 && true}
									/>
								</li>
							)
						})}
				</ul>
			</aside>

			{/* Модальные окна */}
			{openNewField && (
				<Modal setOpen={setOpenNewField}>
					<Form
						buttonText='Создать'
						label='Создание нового листа'
						placeHolder='Название листа'
						onSubmit={(value: string) => {
							const newField = createNewField({
								name: value,
							})

							setActiveField(newField.uuid)
							setOpenNewField(false)
						}}
					/>
				</Modal>
			)}

			{openEditField && (
				<Modal setOpen={setOpenEditField}>
					<Form
						buttonText='Применить'
						label='Изменение названия листа'
						placeHolder='Название листа'
						onSubmit={(value: string) => {
							editFieldName({ uuid: activeField, name: value })
							setOpenEditField(false)
						}}
					/>
				</Modal>
			)}

			{openConfirmDelete && (
				<Modal setOpen={setOpenConfirmDelete}>
					<div className={style.wrapper}>
						<span className={style.span}>Удалить текущий лист?</span>
						<Button
							animate={false}
							className={style.confirm__button}
							text='Да'
							typeSize={ETypeButtonSize.medium}
							typeStyle={ETypeButtonStyle.primary}
							onClick={() => {
								deleteField({
									uuid: activeField,
									uuidTodos: fieldsStore[activeField].uuidTodos,
								})
								setOpenConfirmDelete(false)
							}}
						/>
					</div>
				</Modal>
			)}
		</>
	)
}

export default FieldsList
