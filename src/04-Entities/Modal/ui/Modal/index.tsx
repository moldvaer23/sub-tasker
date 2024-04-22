import { FC, ReactElement, useEffect } from 'react'

import { closeIcon } from '05-Shared/assets/svg'
import { Button, ETypeButtonStyle } from '05-Shared/ui/Button'

import style from './_style.module.scss'

interface IProps {
	children: ReactElement
	setOpen: (value: boolean) => void
}

const Modal: FC<IProps> = ({ children, setOpen }) => {
	// При монтировании
	useEffect(() => {
		// Скролим страницу в самый верх
		window.scrollTo(0, 0)

		// Блокируем страницу
		const page = document.querySelector('.page')
		page?.classList.add('locked')

		const handleEsc = (e: KeyboardEvent): void => {
			if (e.code === 'Escape') {
				setOpen(false)
			}
		}

		document.addEventListener('keydown', handleEsc)

		// Когда демонтировали убираем блокировку
		return () => {
			page?.classList.remove('locked')
			document.removeEventListener('keydown', handleEsc)
		}
	})

	return (
		<div className={style.overlay}>
			<div className={style.modal}>
				<Button
					className={style['close-button']}
					onClick={() => setOpen(false)}
					typeStyle={ETypeButtonStyle.icon}
					image={{
						imageSrc: closeIcon,
						alt: 'Кнопка закрыть',
					}}
				/>

				{children}
			</div>
		</div>
	)
}

export default Modal
