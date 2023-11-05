import { useCallback } from 'react'
import { TaskStatuses } from '../../../../todolists-api'
import { TodolistPropsType } from '../Todolist'

export const useTodolist = ({
															todolist,
															removeTodolist,
															changeTodolistTitle,
															tasks,
															addTask,
															changeFilter
														}: TodolistPropsType) => {

	const addTaskHandler = useCallback(
		(title: string) => {
			addTask(title, todolist.id)
		},
		[addTask, todolist.id]
	)

	const removeTodolistHandler = () => {
		removeTodolist(todolist.id)
	}
	const changeTodolistTitleHandler = useCallback(
		(title: string) => {
			changeTodolistTitle(todolist.id, title)
		},
		[todolist.id, changeTodolistTitle]
	)

	const onAllClickHandlerHandler = useCallback(
		() => changeFilter('all', todolist.id),
		[changeFilter, todolist.id]
	)
	const onActiveClickHandlerHandler = useCallback(
		() => changeFilter('active', todolist.id),
		[changeFilter, todolist.id]
	)
	const onCompletedClickHandlerHandler = useCallback(
		() => changeFilter('completed', todolist.id),
		[changeFilter, todolist.id]
	)

	let tasksForTodolist = tasks

	if (todolist.filter === 'active') {
		tasksForTodolist = tasks.filter((ts) => ts.status === TaskStatuses.New)
	}
	if (todolist.filter === 'completed') {
		tasksForTodolist = tasks.filter(
			(ts) => ts.status === TaskStatuses.Completed
		)
	}

	return {
		tasksForTodolist,
		addTaskHandler,
		removeTodolistHandler,
		changeTodolistTitleHandler,
		onAllClickHandlerHandler,
		onActiveClickHandlerHandler,
		onCompletedClickHandlerHandler
	}
}