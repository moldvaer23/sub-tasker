import { FC } from 'react'

import { Todo } from '02-Widgets/Todo'
import { Fields } from '02-Widgets/Fields'

import style from './_style.module.scss'

const Home: FC = () => {
	return (
		<main className={style.main}>
			<Fields />
			<Todo />
		</main>
	)
}

export default Home
