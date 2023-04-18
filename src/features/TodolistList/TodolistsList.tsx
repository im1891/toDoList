import React, { useCallback, useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import { Todolist } from "./Todolist/Todolist";
import {
  addTodolistTC,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  FilterValuesType,
  getTodolistTC,
  removeTodolistTC,
  TodolistDomainType,
} from "./Todolist/todolists-reducer";
import { AddItemForm } from "../../components/AddItemForm/AddItemForm";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../app/store";
import { useAppDispatch } from "../../custom_hooks/useAppDispatch";
import {
  addTaskTC,
  removeTaskTC,
  TasksStateType,
  updateTaskTC,
} from "./Todolist/tasks-reducer";
import { TaskStatuses } from "../../api/todolists-api";
import { useAppSelector } from "../../custom_hooks/useAppSelector";
import { Navigate } from "react-router-dom";

type TodolistListsPropsType = {
  demo?: boolean;
};

export const TodolistsList: React.FC<TodolistListsPropsType> = ({
  demo = false,
  ...props
}) => {
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
    (state) => state.todolists
  );

  const tasks = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return;
    }
    dispatch(getTodolistTC());
  }, []);

  const removeTask = useCallback(
    (taskId: string, todolistId: string) => {
      dispatch(removeTaskTC(todolistId, taskId));
    },
    [dispatch]
  );

  const addTask = useCallback(
    (title: string, todolistId: string) => {
      dispatch(addTaskTC(todolistId, title));
    },
    [dispatch]
  );

  const changeStatus = useCallback(
    (taskId: string, status: TaskStatuses, todolistId: string) => {
      dispatch(updateTaskTC(todolistId, taskId, { status }));
    },
    [dispatch]
  );

  const changeTaskTitle = useCallback(
    (taskId: string, title: string, todolistId: string) => {
      dispatch(updateTaskTC(todolistId, taskId, { title }));
    },
    [dispatch]
  );

  const changeFilter = useCallback(
    (newFilterValue: FilterValuesType, todolistId: string) => {
      dispatch(changeTodolistFilterAC(todolistId, newFilterValue));
    },
    [dispatch]
  );

  const removeTodolist = useCallback(
    (todolistId: string) => {
      dispatch(removeTodolistTC(todolistId));
    },
    [dispatch]
  );

  const changeTodolistTitle = useCallback(
    (todolistId: string, title: string) => {
      dispatch(changeTodolistTitleTC(todolistId, title));
    },
    [dispatch]
  );

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistTC(title));
    },
    [dispatch]
  );
  const isLoggedIn = useAppSelector((state) => state.authData.isLoggedIn);

  if (!isLoggedIn) return <Navigate replace to={"/login"} />;
  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl, i) => {
          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist
                  key={i}
                  todolist={tl}
                  tasks={tasks[tl.id]}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                  demo={demo}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
