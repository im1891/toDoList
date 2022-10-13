import React, {useEffect, useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {TodoList} from "./components/TodoList/TodoList";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@material-ui/icons";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: TaskType[]

}

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Meat", isDone: false}
        ]
    });
    useEffect(() => {
        console.log(tasks)
        console.log(todoLists)
    }, [tasks, todoLists])
    const addTodoList = (newTodoListTitle: string) => {
        let todoListId = v1()
        let newTodoList: TodoListType = {id: todoListId, title: newTodoListTitle, filter: "all"}
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [todoListId]: []})
    }
    const changeTodoListFilter = (todoListId: string, filterValue: FilterValuesType) => {
        setTodoLists(todoLists.map(td => td.id === todoListId ? {...td, filter: filterValue} : td))
    }

    const removeTodoLIst = (todoListId: string) => {
        setTodoLists(todoLists.filter(td => td.id !== todoListId))
        const {[todoListId]: [], ...rest} = {...tasks}
        setTasks(rest)
    }

    const changeTodoListTitle = (todoListId: string, newTitle: string) => {
        setTodoLists(todoLists.map(td => td.id === todoListId ? {...td, title: newTitle} : td))
    }
    const addTask = (todolistId: string, taskTitle: string) => {
        let newTask: TaskType = {id: v1(), title: taskTitle, isDone: false}
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
    }

    const deleteTask = (todoListId: string, taskId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(ts => ts.id !== taskId)})
    }

    const changeTaskStatus = (todoListId: string, taskId: string, newIsDone: boolean) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(ts => ts.id === taskId ? {...ts, isDone: newIsDone} : ts)
        })
    }

    const changeTaskTitle = (todoListId: string, taskId: string, newTaskTitle: string) => {

        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(ts => ts.id === taskId ? {...ts, title: newTaskTitle} : ts)
        })

    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolist
                    </Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callBack={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(td => {
                        let taskForTodoList = tasks[td.id]

                        if (td.filter === 'active') {
                            taskForTodoList = tasks[td.id].filter(ts => !ts.isDone)
                        }
                        if (td.filter === 'completed') {
                            taskForTodoList = tasks[td.id].filter(ts => ts.isDone)
                        }
                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <TodoList
                                    todoListId={td.id}
                                    title={td.title}
                                    filter={td.filter}
                                    tasks={taskForTodoList}
                                    changeTodoListFilter={changeTodoListFilter}
                                    changeTaskStatus={changeTaskStatus}
                                    deleteTask={deleteTask}
                                    addTask={addTask}
                                    removeTodoList={removeTodoLIst}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodoListTitle={changeTodoListTitle}
                                />
                            </Paper>

                        </Grid>
                    })}
                </Grid>

            </Container>

        </div>
    );
}

export default App;
