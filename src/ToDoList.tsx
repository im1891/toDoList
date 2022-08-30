import React, {useState} from "react";
import {FilterValueType} from "./App";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: TasksType[]
    removeTask: (taskId: string) => void
    changeFilter: (filterValue: FilterValueType) => void
    addTask: (message: string) => void

}


export function ToDoList(props: PropsType) {

    let [inputMessage, setInputMessage] = useState('')

    let mappedTasks = props.tasks.map(ts => {

        return (
            <li key={ts.id}>
                <span>{ts.title}</span> <input type="checkbox" checked={ts.isDone}/>
                <button onClick={() => onClickRemoveHandler(ts.id)}>x</button>
            </li>
        )
    })

    const onClickRemoveHandler = (id: string) => {
        props.removeTask(id)
    }

    const addTaskHandler = () => {
        props.addTask(inputMessage)
        setInputMessage('');
    }

    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        return event.key === 'Enter' ? addTaskHandler() : '';
    }

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputMessage(event.currentTarget.value)
    }

    const changeFilterHandler = (value: FilterValueType) => {
        props.changeFilter(value)
    }


    return (

        <div>
            <h3>{props.title}</h3>
            <div>
                <input onChange={onChangeHandler} value={inputMessage}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>

            <ul>
                {mappedTasks}
            </ul>
            <div>
                <button onClick={() => changeFilterHandler('all')}>All</button>
                <button onClick={() => changeFilterHandler('active')}>Active</button>
                <button onClick={() => changeFilterHandler('completed')}>Completed</button>
            </div>
        </div>

    )

}




