import React, { memo, useCallback } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Task } from "./Task";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodolistPropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
  filter: FilterValuesType;
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => void;
};

export const Todolist = memo((props: TodolistPropsType) => {
  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.id);
    },
    [props.addTask, props.id]
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

  let tasksForTodolist = props.tasks;

  if (props.filter === "active") {
    tasksForTodolist = tasksForTodolist.filter((t) => !t.isDone);
  }
  if (props.filter === "completed") {
    tasksForTodolist = tasksForTodolist.filter((t) => t.isDone);
  }

  const removeTask = useCallback(
    (taskId: string) => {
      props.removeTask(taskId, props.id);
    },
    [props.removeTask, props.id]
  );

  const changeTaskStatus = useCallback(
    (taskId: string, isDone: boolean) => {
      props.changeTaskStatus(taskId, isDone, props.id);
    },
    [props.changeTaskStatus, props.id]
  );

  const changeTaskTitle = useCallback(
    (taskId: string, newTitle: string) => {
      props.changeTaskTitle(taskId, newTitle, props.id);
    },
    [props.changeTaskTitle, props.id]
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
