import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState(false)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError(true);
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false);
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>

        <TextField value={title}
                   error={!!error}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   id="outlined-basic"
                   label={error ? "Title is required" : 'Typeing' }
                   variant="outlined"
                   size='small'/>

        <Button variant="contained"
                style={{maxWidth: '30px', maxHeight: '40px', minWidth: '30px', minHeight: '30px'}}
                onClick={addItem}>+</Button>

        {error && <div className="error-message">{error}</div>}
    </div>
}
