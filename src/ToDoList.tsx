import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType, TaskType} from "./App";
import style from './ToDoList.module.css'

type PropsType = {
    tasks: TaskType[]
    title: string
    addTask: (taskTitle: string) => void
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    changeFilter: (filterValue: FilterType) => void
    filter: FilterType

}

export const ToDoList: React.FC<PropsType> = (props) => {

    let {tasks, title, addTask, removeTask, changeTaskStatus, changeFilter, filter} = props;

    const [inputTitle, setInputTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {

        setInputTitle(e.currentTarget.value)
        setError(null)
    }

    const addTaskButtonHandler = () => {

        if (inputTitle.trim() !== '') {
            addTask(inputTitle)
            setInputTitle('')
            setError(null)
        } else setError('Пиши нормально!')
    }

    const changeFilterValueButtonHandler = (filterValue: FilterType) => {
        changeFilter(filterValue)
    }

    const onKeyPressButtonHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskButtonHandler()
        }
    }
    return (
        <div>
            <h3>{title}</h3>
            <input type="text" className={error ? style.error : ''} onChange={onChangeInputHandler}
                   onKeyPress={onKeyPressButtonHandler} value={inputTitle}/>
            <button onClick={addTaskButtonHandler}>+</button>
            {error && <div className={style.errorMessage}>{error}</div>}
            <ul>
                {tasks.map(ts => {

                    const removeTaskButtonHandler = () => {
                        removeTask(ts.id)
                    }

                    const checkedChangeButtonHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(ts.id, e.currentTarget.checked)
                    }

                    return <li key={ts.id} className={ts.isDone ? style.isDone : ''}>
                        <input type="checkbox" onChange={checkedChangeButtonHandler} checked={ts.isDone}/>
                        <span>{ts.title}</span>
                        <button onClick={removeTaskButtonHandler}>X</button>
                    </li>
                })}
            </ul>
            <button className={filter === 'all' ? style.activeFilter : ''}
                    onClick={() => changeFilterValueButtonHandler('all')}>All
            </button>
            <button className={filter === 'active' ? style.activeFilter : ''}
                    onClick={() => changeFilterValueButtonHandler('active')}>Active
            </button>
            <button className={filter === 'completed' ? style.activeFilter : ''}
                    onClick={() => changeFilterValueButtonHandler('completed')}>Completed
            </button>
        </div>
    )
}