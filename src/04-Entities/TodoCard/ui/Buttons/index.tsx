import { FC, useState } from 'react'

import {
	checkIcon,
	closeIcon,
	deleteIcon,
	editIcon,
} from '05-Shared/assets/svg'
import { Button, ETypeButtonSize, ETypeButtonStyle } from '05-Shared/ui/Button'

import './_style.scss'

interface IProps {
	disabled: boolean
	handleCloseEdit: () => void
	handleDelete: () => void
	handleOpenEdit: () => void
	isActiveEdit: boolean
}

const TodoButtons: FC<IProps> = ({
	disabled,
	handleCloseEdit,
	handleDelete,
	handleOpenEdit,
	isActiveEdit,
}) => {
	const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false)

	return (
		<div className='todo__buttons-wrapper'>
			{!isActiveEdit ? (
				<>
					{!openConfirmDelete ? (
						/* Показываем кнопку удалить */
						<Button
							className='todo__button'
							image={{ imageSrc: deleteIcon, alt: 'Кнопка удаления' }}
							onClick={() => setOpenConfirmDelete(true)}
							typeSize={ETypeButtonSize.small}
							typeStyle={ETypeButtonStyle.icon}
						/>
					) : (
						/* Показываем кнопку подтверждения удаления */
						<Button
							className='todo__button'
							image={{
								imageSrc: checkIcon,
								alt: 'Кнопка подтвердить удаление',
							}}
							onClick={handleDelete}
							onMouseLeave={() => setOpenConfirmDelete(false)}
							typeSize={ETypeButtonSize.small}
							typeStyle={ETypeButtonStyle.icon}
						/>
					)}
					<Button
						className='todo__button'
						disabled={disabled}
						image={{ imageSrc: editIcon, alt: 'Кнопка редактирования' }}
						onClick={handleOpenEdit}
						typeSize={ETypeButtonSize.small}
						typeStyle={ETypeButtonStyle.icon}
					/>
				</>
			) : (
				// Показываем кнопку закрыть форму редактирования
				<>
					<Button
						className='todo__button'
						image={{
							imageSrc: closeIcon,
							alt: 'Кнопка закрыть форму редактирования',
						}}
						onClick={handleCloseEdit}
						typeSize={ETypeButtonSize.small}
						typeStyle={ETypeButtonStyle.icon}
					/>
				</>
			)}
		</div>
	)
}

export default TodoButtons
