import { ChangeEvent, FC, useRef } from 'react'
import clsx from 'clsx'
import { EDefaultClassNames } from '../classNames'

import './_style.scss'

interface IProps {
	focus?: boolean
	className: string
	id?: string
	name: string
	onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
	refCallBack: () => void
	value?: string
}

const TextArea: FC<IProps> = ({
	focus,
	className,
	name,
	id = name,
	onChange,
	refCallBack,
	value,
}) => {
	const rootRef = useRef<HTMLTextAreaElement | null>(null)

	if (focus) rootRef.current?.focus()

	const onFocus = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const val = e.target.value
		e.target.value = ''
		e.target.value = val
	}

	const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.code === 'Enter' && e.shiftKey === false) {
			e.preventDefault()
			refCallBack()
		}
	}

	return (
		<textarea
			className={clsx({ [className]: className }, EDefaultClassNames.textArea)}
			id={id}
			name={name}
			onChange={
				onChange
					? (e: ChangeEvent<HTMLTextAreaElement>): void => onChange(e)
					: undefined
			}
			onFocus={(e) => onFocus(e)}
			onKeyDown={onKeyDown}
			rows={5}
			spellCheck={true}
			ref={rootRef}
			{...(value !== undefined && { value })}
		/>
	)
}
export default TextArea
