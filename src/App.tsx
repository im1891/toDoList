import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {ToDoList} from "./ToDoList";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'


function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ])


    const addTask = (taskTitle: string) => {
        let task = {id: v1(), title: taskTitle, isDone: false}
        setTasks([task, ...tasks])
    }

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(ts => ts.id !== taskId))
    }

    const changeTaskStatus = (taskId: string, newIsDone: boolean) => {
        setTasks(tasks.map(ts => ts.id === taskId ? {...ts, isDone: newIsDone} : ts))
    }


    let filteredTasks = tasks;


    const [filter, setFilter] = useState<FilterType>('all')

    if (filter === 'active') {
        filteredTasks = tasks.filter(ts => !ts.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(ts => ts.isDone)
    }

    const changeFilter = (filter: FilterType) => {
        setFilter(filter)
    }


    return (

        <ToDoList tasks={filteredTasks}
                  title='What to learn'
                  addTask={addTask}
                  removeTask={removeTask}
                  changeTaskStatus={changeTaskStatus}
                  changeFilter={changeFilter}
                  filter={filter}
        />

    );
}

export default App;
