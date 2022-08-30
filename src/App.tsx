import React, {useState} from 'react';
import './App.css';
import {TasksType, ToDoList} from "./ToDoList";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {


    let [tasks, setTasks] = useState<TasksType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Vue', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
    ])


    let removeTask = (taskId: string) => {
        setTasks(tasks.filter(ts => ts.id !== taskId));
    }

    const addTask = (message: string) => {

        const newtask = {id: v1(), title: message, isDone: false}
        setTasks([newtask, ...tasks])
    }


    let [filter, setFilter] = useState<FilterValueType>('all')

    let filteredTasks = tasks;

    if (filter === 'active') {
        filteredTasks = tasks.filter(ts => !ts.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(ts => ts.isDone)
    }

    let changeFilter = (filterValue: FilterValueType) => {
        setFilter(filterValue)

    }


    return (
        <div className="App">
            <ToDoList
                title='What to learn'
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}/>
        </div>


    )
}

export default App;
