import React from 'react';
import './App.css';
import {TaskType, ToDoList} from "./ToDoList";


let tasks1: Array<TaskType> = [
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'JS', isDone: true},
    {id: 3, title: 'ReactJS', isDone: false},
]

let tasks2: Array<TaskType> = [
    {id: 1, title: 'Terminator', isDone: true},
    {id: 2, title: 'XXX', isDone: false},
    {id: 3, title: 'Green book', isDone: true}
]

function App() {
    return (
        <div className="App">
            <ToDoList title='What to learn' tasks={tasks1}/>
            <ToDoList title='Movies' tasks={tasks2}/>
        </div>
    );
}

export default App;
