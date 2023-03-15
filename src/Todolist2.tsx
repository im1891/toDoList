import React, { memo, useCallback } from "react";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Task } from "./Task";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "./state/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import { TaskStatuses, TaskType } from "./api/todolists-api";
import { FilterValuesType } from "./state/todolists-reducer";

type TodolistPropsType = {
  id: string;
  title: string;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
  filter: FilterValuesType;
};

export const Todolist2 = memo((props: TodolistPropsType) => {
  const dispatch = useDispatch();

  const tasks = useSelector<AppRootStateType, TaskType[]>(
    (state) => state.tasks[props.id]
  );

  const addTask = useCallback(
    (title: string) => {
      dispatch(addTaskAC(title, props.id));
    },
    [props.id]
  );

  const removeTodolist = () => {
    props.removeTodolist(props.id);
  };
  const changeTodolistTitle = (title: string) => {
    props.changeTodolistTitle(props.id, title);
  };

  const onAllClickHandler = useCallback(
    () => props.changeFilter("all", props.id),
    [props.changeFilter, props.id]
  );
  const onActiveClickHandler = useCallback(
    () => props.changeFilter("active", props.id),
    [props.changeFilter, props.id]
  );
  const onCompletedClickHandler = useCallback(
    () => props.changeFilter("completed", props.id),
    [props.changeFilter, props.id]
  );

  let tasksForTodolist = tasks;

  if (props.filter === "active") {
    tasksForTodolist = tasksForTodolist.filter(
      (t) => t.status === TaskStatuses.New
    );
  }
  if (props.filter === "completed") {
    tasksForTodolist = tasksForTodolist.filter(
      (t) => t.status === TaskStatuses.Completed
    );
  }

  const removeTask = useCallback(
    (taskId: string) => {
      dispatch(removeTaskAC(taskId, props.id));
    },
    [props.id]
  );

  const changeTaskStatus = useCallback(
    (taskId: string, status: TaskStatuses) => {
      dispatch(changeTaskStatusAC(taskId, status, props.id));
    },
    [props.id]
  );

  const changeTaskTitle = useCallback(
    (taskId: string, newTitle: string) => {
      dispatch(changeTaskTitleAC(taskId, newTitle, props.id));
    },
    [props.id]
  );

  return (
    <div>
      <h3>
        <EditableSpan value={props.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolist}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <div>
        {tasksForTodolist.map((t) => {
          return (
            <Task
              key={t.id}
              task={t}
              removeTask={removeTask}
              changeTaskStatus={changeTaskStatus}
              changeTaskTitle={changeTaskTitle}
            />
          );
        })}
      </div>
      <div style={{ paddingTop: "10px" }}>
        <ButtonExample
          variant={props.filter === "all" ? "outlined" : "text"}
          onClickHandler={onAllClickHandler}
          color={"inherit"}
        >
          All
        </ButtonExample>
        <ButtonExample
          variant={props.filter === "active" ? "outlined" : "text"}
          onClickHandler={onActiveClickHandler}
          color={"primary"}
        >
          Active
        </ButtonExample>
        <ButtonExample
          variant={props.filter === "completed" ? "outlined" : "text"}
          onClickHandler={onCompletedClickHandler}
          color={"secondary"}
        >
          Completed
        </ButtonExample>
      </div>
    </div>
  );
});

type ButtonExamplePropsType = {
  variant: "outlined" | "text";
  onClickHandler: () => void;
  children: string;
  color: "secondary" | "primary" | "inherit";
};

const ButtonExample = memo((props: ButtonExamplePropsType) => {
  return (
    <Button
      variant={props.variant}
      onClick={props.onClickHandler}
      color={props.color}
    >
      {props.children}
    </Button>
  );
});
