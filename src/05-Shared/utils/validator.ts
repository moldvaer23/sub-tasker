import type { Dispatch } from 'react'

type TProps = {
	data: string
	setError: Dispatch<React.SetStateAction<boolean>>
	setErrorMessage: Dispatch<React.SetStateAction<string>>
}

const validator = ({ data, setError, setErrorMessage }: TProps): void => {
	const isEmptyOrWhitespace = /^\s*$/.test(data) // Проверяем наличие только пробельных символов

	// Проверка на пустое поле
	if (data.length === 0 || isEmptyOrWhitespace) {
		setError(true)
	}
	// Проверка на длину задачи не > 400 символов
	else if (data.length > 400) {
		setError(true)
		setErrorMessage('Длина задачи не может превышать 400 символов')
	} else {
		setError(false)
		setErrorMessage('')
	}
}

export default validator
