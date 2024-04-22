import { FC } from 'react'
import { EDefaultClassNames } from '../classNames'

import './_style.scss'

interface IProps {
	errorMessage: string
}

const ErrorAlert: FC<IProps> = ({ errorMessage }) => {
	return <span className={EDefaultClassNames.errorAlert}>{errorMessage}</span>
}

export default ErrorAlert
