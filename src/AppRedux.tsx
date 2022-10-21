import React from "react";
import "./App.css";
import { AddItemForm } from "./components/AddItemForm";
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
import { Menu } from "@material-ui/icons";
import { addTodoListAC, TodoListType } from "./reducers/todoLists-reducer";
import { TodoListRedux } from "./components/TodoList/TodoListRedux";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "./store";

export function AppRedux() {
  const dispatch = useDispatch();

  const todoLists = useSelector<AppStateType, TodoListType[]>(
    (state) => state.todoLists
  );

  const addTodoList = (newTodoListTitle: string) => {
    dispatch(addTodoListAC(newTodoListTitle));
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6">Todolist</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm callBack={addTodoList} />
        </Grid>
        <Grid container spacing={3}>
          {todoLists.map((td) => {
            return (
              <Grid item>
                <Paper style={{ padding: "10px" }}>
                  {/*  <TodoList
                    todoListId={td.id}
                    title={td.title}
                    filter={td.filter}
                    tasks={taskForTodoList}
                    changeTodoListFilter={changeTodoListFilter}
                    changeTaskStatus={changeTaskStatus}
                    removeTask={removeTask}
                    addTask={addTask}
                    removeTodoList={removeTodoLIst}
                    changeTaskTitle={changeTaskTitle}
                    changeTodoListTitle={changeTodoListTitle}
                  />*/}
                  <TodoListRedux
                    todoListId={td.id}
                    title={td.title}
                    filter={td.filter}
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
