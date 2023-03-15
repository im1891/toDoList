import React, { useReducer } from "react";
import "./App.css";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import { Todolist } from "./Todolist";

import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  FilterValuesType,
  removeTodolistAC,
  todolistsReducer,
} from "./state/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./state/tasks-reducer";
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
import { TaskPriorities, TaskStatuses } from "./api/todolists-api";

export function AppWithReducers() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
    {
      id: todolistId1,
      title: "What to learn",
      filter: "all",
      order: 0,
      addedDate: "",
    },
    {
      id: todolistId2,
      title: "What to buy",
      filter: "all",
      order: 0,
      addedDate: "",
    },
  ]);

  let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
    const action = removeTaskAC(taskId, todolistId);
    dispatchToTasks(action);
  }

  function addTask(taskTitle: string, todolistId: string) {
    dispatchToTasks(addTaskAC(taskTitle, todolistId));
  }

  function changeStatus(
    taskId: string,
    status: TaskStatuses,
    todolistId: string
  ) {
    dispatchToTasks(changeTaskStatusAC(taskId, status, todolistId));
  }

  function changeTaskTitle(
    taskId: string,
    newTitle: string,
    todolistId: string
  ) {
    dispatchToTasks(changeTaskTitleAC(taskId, newTitle, todolistId));
  }

  function changeFilter(newFilterValue: FilterValuesType, todolistId: string) {
    dispatchToTodolists(changeTodolistFilterAC(todolistId, newFilterValue));
  }

  function removeTodolist(todolistId: string) {
    const action = removeTodolistAC(todolistId);
    dispatchToTodolists(action);
    dispatchToTasks(action);
  }

  function changeTodolistTitle(todolistId: string, newTodolistTitle: string) {
    dispatchToTodolists(changeTodolistTitleAC(todolistId, newTodolistTitle));
  }

  function addTodolist(title: string) {
    const action = addTodolistAC(title);
    dispatchToTasks(action);
    dispatchToTodolists(action);
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
                    changeTaskStatus={changeStatus}
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
