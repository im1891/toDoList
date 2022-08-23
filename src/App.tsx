import React, {useState} from 'react';
import './App.css';
import {TasksType, ToDoList} from "./ToDoList";

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {


    let [tasks, setTasks] = useState<TasksType[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Vue', isDone: false},
    ])


    let removeTask = (taskId: number) => {
        setTasks(tasks.filter(ts => ts.id !== taskId));
    }

    /*

        let [filter, setFilter] = useState<FilterValueType>('all')

        let filteredTasks = tasks;

        if (filter === 'active') {
            filteredTasks = tasks.filter(ts => ts.isDone === false)
        }
        if (filter === 'completed') {
            filteredTasks = tasks.filter(ts => ts.isDone === true)
        }

        let changeFilter = (filterValue: FilterValueType) => {
            setFilter(filterValue)

        }
    */

    return (
        /* <div className="App">
             <ToDoList title='What to learn' tasks={filteredTasks} removeTask={removeTask} changeFilter={changeFilter}/>
         </div>*/

        <div className="App">
            <ToDoList title='What to learn' tasks={tasks} removeTask={removeTask}/>
        </div>
    )
}

export default App;
