import React, { ChangeEvent, useCallback } from 'react'
import { TaskStatuses, TaskType } from '../../../../todolists-api'
import Checkbox from '@mui/material/Checkbox/Checkbox'
import { EditableSpan } from '../../../../components/EditableSpan/EditableSpan'
import { IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'

export const Task: React.FC<TaskPropsType> = React.memo(
	({
		 task,
		 removeTask,
		 changeTaskStatus,
		 changeTaskTitle,
		 todolistId
	 }) => {
		const deleteTaskHandler = () =>
			removeTask(task.id, todolistId)
		const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
			changeTaskStatus(
				task.id,
				e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,
				todolistId
			)
		}
		const changeTitleHandler = useCallback(
			(newValue: string) => {
				changeTaskTitle(task.id, newValue, todolistId)
			},
			[task.id, changeTaskTitle, todolistId]
		)

		return (
			<div style={{ opacity: task.status === TaskStatuses.Completed ? '.5' : '1' }}>
				<Checkbox
					checked={task.status === TaskStatuses.Completed}
					color='primary'
					onChange={changeStatusHandler}
				/>
				<EditableSpan value={task.title} onChange={changeTitleHandler} />
				<IconButton onClick={deleteTaskHandler}>
					<Delete />
				</IconButton>
			</div>
		)
	})

//types
export type TaskPropsType = {
	changeTaskStatus: (
		taskId: string,
		status: TaskStatuses,
		todolistId: string
	) => void
	changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
	removeTask: (taskId: string, todolistId: string) => void
	task: TaskType
	todolistId: string
}