import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TasksType} from './App';
import {Button} from "./сomponents/Button";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: number
    title: string
    tasks: Array<TasksType>
    students: Array<string>
    removeTask: (taskId: string, todolistId: number) => void
    changeFilter: (value: FilterValuesType, todolistId: number) => void
    addTask: (title: string, todolistId: number) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: number) => void
    removeTodolist: (id: number) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            // addTask();
        }
    }

    const removeTodoListHandler = () => {
        props.removeTodolist(props.id)
    }

    const addTaskHandler = () => {
        props.addTask(title, props.id)
    }

    const removeTaskHandler = (taskId: string) => {
        props.removeTask(taskId, props.id)
    }

    const tsarFoo = (filter: FilterValuesType) => {
        props.changeFilter(filter, props.id)
    }

    return <div>
        <h3> {props.title}
            <Button name={'X'} callBack={removeTodoListHandler}/>
            {/* <button onClick={() => {
                'removeTodolist'
            }}>x
            </button>*/}

        </h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={() => {
                'addTask'
            }}>+
            </button>
            {error && <div className="error-message">{error}</div>}

            <Button name={'+'} callBack={addTaskHandler}/>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.taskId, newIsDoneValue, props.id);
                    }

                    /*   const removeTaskHandler = () => {
                           props.removeTask(t.taskId, props.id)
                       }*/

                    return <li key={t.taskId} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button name={'x'} callBack={() => removeTaskHandler(t.taskId)}/>


                    </li>
                })
            }
        </ul>
        <div>
            <Button name={'all'} callBack={() => tsarFoo('all')}/>
            <Button name={'active'} callBack={() => tsarFoo('active')}/>
            <Button name={'completed'} callBack={() => tsarFoo('completed')}/>
          {/*  <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={() => tsarFoo('all')}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""} onClick={() => tsarFoo('active')}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={() => tsarFoo('completed')}>Completed
            </button>*/}
        </div>
        <p></p>
        {
            props.students.map((el) => {
                return (
                    <div>{el}</div>
                )
            })
        }
    </div>
}