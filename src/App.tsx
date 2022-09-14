import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {ToDoList} from "./ToDoList";

export type FilterValuesType = "all" | "active" | "completed";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Car", isDone: false},
            {id: v1(), title: "Shoes", isDone: false},
            {id: v1(), title: "Clothes", isDone: false},
        ]
    });

    const deleteList = (todoListId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]


    }

    /*

        let [todolists, setTodolists] = useState<Array<TodolistsType>>([
            {id: v1(), title: 'What to learn', filter: 'all'},
            {id: v1(), title: 'What to buy', filter: 'all'},
        ])


        let [tasks, setTasks] = useState([
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ]);
    */

    //   let [filter, setFilter] = useState<FilterValuesType>("all");


    function removeTask(id: string, todoListId: string) {
        /*    let filteredTasks = tasks.filter(t => t.id != id);
            setTasks(filteredTasks);*/
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(ts => ts.id !== id)})
    }

    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, isDone: false};
        /*let newTasks = [task, ...tasks];
        setTasks(newTasks);*/

        setTasks({...tasks, [todoListId]: [task, ...tasks[todoListId]]})
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        /* let task = tasks.find(t => t.id === taskId);
         if (task) {
             task.isDone = isDone;
         }

         setTasks([...tasks]);*/

        setTasks({...tasks, [todoListId]: tasks[todoListId].map(ts => ts.id === taskId ? {...ts, isDone} : ts)})
    }


    function changeFilter(todoListId: string, value: FilterValuesType) {
        setTodolists(todolists.map(tl => tl.id === todoListId ? {...tl, filter: value} : tl))
    }


    return (
        <div className="App">
            {todolists.map(tl => {

                let tasksForTodolist = tasks[tl.id];

                if (tl.filter === "active") {
                    tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
                }

                return <ToDoList
                    key={tl.id}
                    todoListId={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={tl.filter}
                    deleteList={deleteList}
                />
            })}

        </div>
    );
}

export default App;
