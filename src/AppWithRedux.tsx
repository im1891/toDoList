import React, { useCallback } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { AddItemForm } from "./AddItemForm";
import {
  FilterValuesType,
  TodolistDomainType,
  todolistsAC,
  todolistsTC,
} from "./state/todolists-reducer";
import { useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
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
import { TasksStateType } from "./App";
import { TaskStatuses } from "./api/todolists-api";
import { useAppDispatch } from "./custom_hooks/useAppDispatch";
import { tasksAC, tasksTC } from "./state/tasks-reducer";

export const AppWithRedux = () => {
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
    (state) => state.todolists
  );

  const tasks = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks
  );

  const dispatch = useAppDispatch();

  const removeTask = useCallback(
    (taskId: string, todolistId: string) => {
      dispatch(tasksTC.removeTask(taskId, todolistId));
    },
    [dispatch]
  );

  const addTask = useCallback(
    (title: string, todolistId: string) => {
      dispatch(tasksTC.addTask(todolistId, title));
    },
    [dispatch]
  );

  const changeStatus = useCallback(
    (taskId: string, status: TaskStatuses, todolistId: string) => {
      dispatch(tasksAC.updateTask(taskId, { status }, todolistId));
    },
    [dispatch]
  );

  const changeTaskTitle = useCallback(
    (taskId: string, newTitle: string, todolistId: string) => {
      dispatch(tasksAC.updateTask(taskId, { title: newTitle }, todolistId));
    },
    [dispatch]
  );

  const changeFilter = useCallback(
    (newFilterValue: FilterValuesType, todolistId: string) => {
      dispatch(todolistsAC.changeTodolistFilter(todolistId, newFilterValue));
    },
    [dispatch]
  );

  const removeTodolist = useCallback(
    (todolistId: string) => {
      dispatch(todolistsAC.removeTodolist(todolistId));
    },
    [dispatch]
  );

  const changeTodolistTitle = useCallback(
    (todolistId: string, title: string) => {
      dispatch(todolistsAC.changeTodolistTitle(todolistId, title));
    },
    [dispatch]
  );

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(todolistsTC.addTodolist(title));
    },
    [dispatch]
  );

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
            return (
              <Grid item key={tl.id}>
                <Paper style={{ padding: "10px" }}>
                  <Todolist
                    id={tl.id}
                    title={tl.title}
                    tasks={tasks[tl.id]}
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
};
