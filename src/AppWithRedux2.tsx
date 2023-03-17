import React, { useCallback, useEffect } from "react";
import "./App.css";
import { AddItemForm } from "./AddItemForm";
import {
  FilterValuesType,
  TodolistDomainType,
  todolistsAC,
  todolistsTC,
} from "./state/todolists-reducer";
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
import { Todolist2 } from "./Todolist2";
import { useAppSelector } from "./custom_hooks/useAppSelector";
import { useAppDispatch } from "./custom_hooks/useAppDispatch";

export const AppWithRedux2 = () => {
  const todolists = useAppSelector<Array<TodolistDomainType>>(
    (state) => state.todolists
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(todolistsTC.getTodolist());
  }, []);

  const changeFilter = useCallback(
    (newFilterValue: FilterValuesType, todolistId: string) => {
      dispatch(todolistsAC.changeTodolistFilter(todolistId, newFilterValue));
    },
    [dispatch]
  );

  const removeTodolist = useCallback(
    (todolistId: string) => {
      dispatch(todolistsTC.removeTodolist(todolistId));
    },
    [dispatch]
  );

  const changeTodolistTitle = useCallback(
    (todolistId: string, title: string) => {
      dispatch(todolistsTC.changeTodolistTitle(todolistId, title));
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
                  <Todolist2
                    id={tl.id}
                    title={tl.title}
                    changeFilter={changeFilter}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
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
