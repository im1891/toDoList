import React, {useState} from "react";
import {FilterValueType} from "./App";

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}

/*type PropsType = {
    title: string
    tasks: TasksType[]
    removeTask: (taskId: number) => void
    changeFilter: (filterValue: FilterValueType) => void

}*/

type PropsType = {
    title: string
    tasks: TasksType[]
    removeTask: (taskId: number) => void


}

export function ToDoList(props: PropsType) {


    let [filter, setFilter] = useState<FilterValueType>('all')

    let filteredTasks = props.tasks;

    if (filter === 'active') {
        filteredTasks = props.tasks.filter(ts => !ts.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = props.tasks.filter(ts => ts.isDone)
    }

    let changeFilter = (filterValue: FilterValueType) => {
        setFilter(filterValue)

    }


    /*   let mappedTasks = props.tasks.map(ts => <li key={ts.id}>
           <span>{ts.title}</span> <input type="checkbox" checked={ts.isDone}/>
           <button onClick={() => props.removeTask(ts.id)}>x</button>
       </li>)*/

    let mappedTasks = filteredTasks.map(ts => <li key={ts.id}>
        <span>{ts.title}</span> <input type="checkbox" checked={ts.isDone}/>
        <button onClick={() => props.removeTask(ts.id)}>x</button>
    </li>)

    return (

        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>

            <ul>
                {mappedTasks}
            </ul>
            <div>
                <button onClick={() => changeFilter('all')}>All</button>
                <button onClick={() => changeFilter('active')}>Active</button>
                <button onClick={() => changeFilter('completed')}>Completed</button>
            </div>
        </div>

    )

}




