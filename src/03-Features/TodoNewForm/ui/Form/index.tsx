import { ChangeEvent, FC, useEffect, useState } from 'react'

import validator from '05-Shared/utils/validator'
import { addIconPlus } from '05-Shared/assets/svg'
import { ErrorAlert } from '05-Shared/ui/ErrorAlert'
import { ETypeInput, Input } from '05-Shared/ui/Input'
import { Button, ETypeButton, ETypeButtonStyle } from '05-Shared/ui/Button'

import style from './_style.module.scss'

interface IProps {
	createNewTodo: (task: string) => void
}

/**
 * (Features)\
 * \
 * Функциональный компонент предназначенный для отображения формы добавления задачи.
 */
const TodoNewForm: FC<IProps> = ({ createNewTodo }) => {
	const [error, setError] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [task, setTask] = useState<string>('')

	// Проводим валидацию поля task
	useEffect((): void => {
		validator({
			data: task,
			setError: setError,
			setErrorMessage: setErrorMessage,
		})
	}, [task])

	// Функция обработчик подтверждения формы
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault()

		if (!error) {
			// Создаем новую модель главной задачи
			createNewTodo(task)

			// Прокручиваем страницу в низ
			window.scrollTo(0, document.body.scrollHeight)

			// Обнуляем поле формы
			setTask('')
		}
	}

	return (
		<form
			className={style.form}
			name='new-todo'
			id='new-todo'
			onSubmit={handleSubmit}
		>
			<label className={style.label} htmlFor='new-todo'>
				<span className={style.span}>У тебя новая задача?</span>
				<Input
					className={style.form__input}
					name='new-todo'
					onChange={(e: ChangeEvent<HTMLInputElement>): void =>
						setTask(e.target.value)
					}
					placeholder='Напиши её тут'
					required
					type={ETypeInput.text}
					value={task}
				/>
				{errorMessage.length > 0 && <ErrorAlert errorMessage={errorMessage} />}
			</label>

			<Button
				animate={false}
				className={style.form__button}
				disabled={error}
				type={ETypeButton.submit}
				typeStyle={ETypeButtonStyle.icon}
				image={{
					alt: 'Добавить задачу',
					imageSrc: addIconPlus,
				}}
			/>
		</form>
	)
}

export default TodoNewForm
