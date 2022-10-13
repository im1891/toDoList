import React, {ChangeEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@material-ui/icons";


type AddItemFormPropsType = {
    callBack: (title: string) => void
}
export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {
    const {callBack} = props

    const [title, setTitle] = useState('')
    const [error, setError] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError('')
    }

    const addItem = () => {

        if (title.trim() !== '') {
            callBack(title)
            setTitle('')
        } else setError('Title is required')

    }
    return (
        <div>
            <TextField id="outlined-basic" label={error ? 'Title is required' : 'Type...'} variant="outlined"
                       value={title} size='small' error={!!error} onChange={onChangeHandler}/>
            <IconButton
                onClick={addItem}
                color='primary'
                style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}
            > <AddBox/></IconButton>
        </div>
    );
};

