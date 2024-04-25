import { FC } from 'react'

import { Todo } from '02-Widgets/Todo'
import { Fields } from '02-Widgets/Fields'
import logo from '05-Shared/assets/png/logo.png'

import style from './_style.module.scss'

/**
 * (Page)\
 * \
 * Функциональный компонент предназначенный для сборки страницы Home.
 */
const Home: FC = () => {
	return (
		<main className={style.main}>
			<div className={style.title__wrapper}>
				<div className={style.logo__wrapper}>
					<img className={style.logo} src={logo} alt='Логотип' />
					<span className={style.span}>By Moldvaer</span>
				</div>
				<h1 className={style.title}>Sub Tasker</h1>
			</div>
			<Fields />
			<Todo />
		</main>
	)
}

export default Home
