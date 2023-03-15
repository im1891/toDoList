import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { TaskPriorities, TaskStatuses, TaskType } from "./api/todolists-api";
import {
  FilterValuesType,
  TodolistDomainType,
} from "./state/todolists-reducer";

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
    {
      id: todolistId1,
      title: "What to learn",
      filter: "all",
      addedDate: "",
      order: 0,
    },
    {
      id: todolistId2,
      title: "What to buy",
      filter: "all",
      addedDate: "",
      order: 0,
    },
  ]);

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      {
        id: v1(),
        title: "HTML&CSS",
        status: TaskStatuses.Completed,
        description: "",
        todoListId: todolistId1,
        startDate: "",
        addedDate: "",
        priority: TaskPriorities.Low,
        order: 0,
        deadline: "",
      },
      {
        id: v1(),
        title: "JS",
        status: TaskStatuses.Completed,
        description: "",
        todoListId: todolistId1,
        startDate: "",
        addedDate: "",
        priority: TaskPriorities.Low,
        order: 0,
        deadline: "",
      },
    ],
    [todolistId2]: [
      {
        id: v1(),
        title: "Milk",
        status: TaskStatuses.Completed,
        description: "",
        todoListId: todolistId2,
        startDate: "",
        addedDate: "",
        priority: TaskPriorities.Low,
        order: 0,
        deadline: "",
      },
      {
        id: v1(),
        title: "React Book",
        status: TaskStatuses.Completed,
        description: "",
        todoListId: todolistId2,
        startDate: "",
        addedDate: "",
        priority: TaskPriorities.Low,
        order: 0,
        deadline: "",
      },
    ],
  });

  function removeTask(taskId: string, todolistId: string) {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].filter((ts) => ts.id !== taskId),
    });
  }

  function addTask(taskTitle: string, todolistId: string) {
    let newTask = {
      id: v1(),
      title: taskTitle,
      status: TaskStatuses.New,
      description: "",
      todoListId: todolistId2,
      startDate: "",
      addedDate: "",
      priority: TaskPriorities.Low,
      order: 0,
      deadline: "",
    };
    setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] });
  }

  function changeTaskStatus(
    taskId: string,
    status: TaskStatuses,
    todolistId: string
  ) {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((ts) =>
        ts.id === taskId ? { ...ts, status } : ts
      ),
    });
  }

  function changeTaskTitle(
    taskId: string,
    newTitle: string,
    todolistId: string
  ) {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((ts) =>
        ts.id === taskId ? { ...ts, title: newTitle } : ts
      ),
    });
  }

  function changeFilter(newFilterValue: FilterValuesType, todolistId: string) {
    setTodolists(
      todolists.map((td) =>
        td.id === todolistId ? { ...td, filter: newFilterValue } : td
      )
    );
  }

  function removeTodolist(todolistId: string) {
    const {
      [todolistId]: [],
      ...restTasks
    } = { ...tasks };

    setTodolists(todolists.filter((td) => td.id !== todolistId));
    setTasks(restTasks);
  }

  function changeTodolistTitle(todolistId: string, newTodolistTitle: string) {
    setTodolists(
      todolists.map((td) =>
        td.id === todolistId ? { ...td, title: newTodolistTitle } : td
      )
    );
  }

  function addTodolist(title: string) {
    let newTodolistId = v1();
    let newTodolist: TodolistDomainType = {
      id: newTodolistId,
      title: title,
      filter: "all",
      addedDate: "",
      order: 0,
    };
    setTodolists([newTodolist, ...todolists]);
    setTasks({
      ...tasks,
      [newTodolistId]: [],
    });
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todolists.map((tl) => {
            let allTodolistTasks = tasks[tl.id];
            let tasksForTodolist = allTodolistTasks;

            if (tl.filter === "active") {
              tasksForTodolist = allTodolistTasks.filter(
                (t) => t.status === TaskStatuses.New
              );
            }
            if (tl.filter === "completed") {
              tasksForTodolist = allTodolistTasks.filter(
                (t) => t.status === TaskStatuses.Completed
              );
            }

            return (
              <Grid key={tl.id} item>
                <Paper style={{ padding: "10px" }}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
