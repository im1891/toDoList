import React, { ChangeEvent, useState } from 'react'
import { TextField } from '@mui/material'
import { TaskStatuses } from '../../todolists-api'

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(({ value, onChange, status }) => {
	let [editMode, setEditMode] = useState(false)
	let [newValue, setNewValue] = useState(value)

	const toggleEditMode = () => {
		if (status === TaskStatuses.Completed) return

		if (editMode) {
			if (newValue.trim() !== value && newValue.trim().length) {
				onChange(newValue.trim())
			} else {
				setNewValue(value)
			}
		}

		setEditMode(prevState => !prevState)
	}
	const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setNewValue(e.currentTarget.value)
	}
	const onEnterHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
		e.key === 'Enter' && toggleEditMode()
	}

	if (editMode) return <TextField
		autoFocus
		value={newValue}
		onChange={changeTitle}
		onBlur={toggleEditMode}
		onKeyDown={onEnterHandler}
	/>
	return <span style={{ textDecoration: status === TaskStatuses.Completed ? 'line-through' : 'none' }}
							 onDoubleClick={toggleEditMode}>{value}</span>
})

// types
type EditableSpanPropsType = {
	value: string
	onChange: (newValue: string) => void
	status?: TaskStatuses
}