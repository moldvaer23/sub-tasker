import { FC } from 'react'

import { ITodoModel } from '05-Shared/types'
import { useAppSelector } from '00-App/store'
import { TodoCard } from '04-Entities/TodoCard'

import style from './_style.module.scss'

interface IProps {
	createPresentTodo: (data: {
		task: string
		important: boolean
		uuid: string
	}) => ITodoModel
}

const TodoList: FC<IProps> = ({ createPresentTodo }) => {
	const todos = useAppSelector((state) => state.todos.todos)

	const uuidActiveEditTodo = useAppSelector((state) => state.todos.activeEdit)

	if (Object.keys(todos).length === 0) {
		return <p>Список задач пуст</p>
	}

	return (
		<ul className={style.todo__list}>
			{Object.values(todos).map((todo, indexMain) => {
				// Создаем модель
				const todoModel = createPresentTodo({
					task: todo.task,
					important: todo.important,
					uuid: todo.uuid,
				})

				return (
					<li className={style.todo__item} key={indexMain}>
						<TodoCard
							handleClearActiveEdit={() => todoModel.setActiveEdit('')}
							handleCreateSubTodo={() => todoModel.createSubTodo({ task: '' })}
							handleDelete={() => todoModel.deleteTodo()}
							handleSetActiveEdit={() => todoModel.setActiveEdit(todo.uuid)}
							handleSetImportant={(value: boolean) =>
								todoModel.setImportantTodo(value)
							}
							handleSubmit={(changeTask: string) =>
								todoModel.editTodo({ task: changeTask, uuid: todoModel.uuid })
							}
							important={todo.important}
							task={todo.task}
							uuidActiveEditTodo={uuidActiveEditTodo}
						/>

						{Object.values(todo.subTodos).length > 0 && (
							<ul className={style.subtodos__list}>
								{Object.values(todo.subTodos).map((subTodo, indexSub) => {
									// Создаем и получаем объект подзадачи
									const subTodoObj = todoModel.createSubTodo({
										uuid: subTodo.uuid,
										task: subTodo.task,
										important: subTodo.important,
									})

									return (
										<li key={indexSub}>
											<TodoCard
												handleClearActiveEdit={() =>
													todoModel.setActiveEdit('')
												}
												handleSetActiveEdit={() =>
													todoModel.setActiveEdit(subTodoObj.uuid)
												}
												handleSetImportant={(value: boolean) =>
													todoModel.setImportantSubTodo({
														uuid: subTodoObj.uuid,
														value: value,
													})
												}
												important={subTodoObj.important}
												isSubTodo
												task={subTodoObj.task}
												uuidActiveEditTodo={uuidActiveEditTodo}
												handleDelete={() =>
													todoModel.deleteSubTodo({
														uuidPinTodo: todoModel.uuid,
														uuidSubTodo: subTodoObj.uuid,
													})
												}
												handleSubmit={(changeTask: string) => {
													todoModel.setActiveEdit('')
													todoModel.editSubTodo({
														task: changeTask,
														uuid: subTodoObj.uuid,
													})
												}}
											/>
										</li>
									)
								})}
							</ul>
						)}
					</li>
				)
			})}
		</ul>
	)
}

export default TodoList
