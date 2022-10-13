import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "../../App";
import {AddItemForm} from "../AddItemForm";
import {EditableSpan} from "../EditableSpan";
import s from './TodoList.module.css'
import {Delete} from "@mui/icons-material";
import {Button, Checkbox, IconButton} from "@mui/material";

type TodoListPropsType = {
    todoListId: string
    title: string
    filter: FilterValuesType
    tasks: TaskType[]
    changeTodoListFilter: (todoListId: string, filterValue: FilterValuesType) => void
    changeTaskStatus: (todoListId: string, taskId: string, newIsDone: boolean) => void
    deleteTask: (todoListId: string, taskId: string) => void
    addTask: (todolistId: string, taskTitle: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (todoListId: string, taskId: string, newTaskTitle: string) => void
    changeTodoListTitle: (todoListId: string, newTitle: string) => void
}
export const TodoList: React.FC<TodoListPropsType> = (props) => {
    const {
        todoListId,
        title,
        filter,
        tasks,
        changeTodoListFilter,
        changeTaskStatus,
        deleteTask,
        addTask,
        removeTodoList,
        changeTaskTitle,
        changeTodoListTitle
    } = props

    const onAllClickHandler = () => {
        changeTodoListFilter(todoListId, 'all')
    }

    const onActiveClickHandler = () => {
        changeTodoListFilter(todoListId, 'active')
    }

    const onCompletedClickHandler = () => {
        changeTodoListFilter(todoListId, 'completed')
    }

    const removeTodoListHandler = () => {
        removeTodoList(todoListId)
    }

    const addNewTask = (taskTitle: string) => {
        addTask(todoListId, taskTitle)
    }

    const onChangeTodoListTitleHandler = (newTitle: string) => {
        changeTodoListTitle(todoListId, newTitle)
    }

    return (
        <div>
            <h3>
                <EditableSpan value={title} onChange={onChangeTodoListTitleHandler}/>
                <IconButton onClick={removeTodoListHandler} aria-label="delete">
                    <Delete/>
                </IconButton>
            </h3>
            <div>
                <AddItemForm callBack={addNewTask}/>
            </div>
            <ul>
                {tasks.map(ts => {
                    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(todoListId, ts.id, e.currentTarget.checked)
                    }

                    const deleteTaskHandler = () => {
                        deleteTask(todoListId, ts.id)
                    }

                    const onChangeTaskTitleHandler = (newTitle: string) => {
                        changeTaskTitle(todoListId, ts.id, newTitle)
                    }
                    return <div key={ts.id} className={ts.isDone ? s.completed : ''}>
                        <Checkbox defaultChecked color="success" onChange={onChangeTaskStatusHandler}
                                  checked={ts.isDone}/>
                        <EditableSpan value={ts.title} onChange={onChangeTaskTitleHandler}/>
                        <IconButton onClick={deleteTaskHandler} size="small">
                            <Delete/>
                        </IconButton>
                    </div>
                })}
            </ul>
            <Button color='secondary' variant={filter === 'all' ? 'outlined' : 'contained'}
                    onClick={onAllClickHandler}>All</Button>
            <Button variant={filter === 'active' ? 'outlined' : 'contained'} onClick={onActiveClickHandler}
                    color="error">Active</Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'contained'}
                    onClick={onCompletedClickHandler} color='success'>Completed
            </Button>
        </div>
    );
};

