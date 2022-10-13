import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
    const {value, onChange} = props
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(value)

    const onChangeCurrentTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const activateEditMode = () => {
        setEditMode(true)
    }

    const activateViewMode = () => {
        setEditMode(false)
        title && onChange(title)
    }

    if (editMode) return <TextField id="outlined-basic" label='Type...' variant="outlined" value={title} size='small'
                                    onChange={onChangeCurrentTitleHandler} onBlur={activateViewMode} autoFocus/>
    return <span onDoubleClick={activateEditMode}>{value}</span>
};
