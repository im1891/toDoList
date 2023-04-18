import React, { memo, useCallback } from "react";
import { AddItemForm } from "../../../components/AddItemForm/AddItemForm";
import { EditableSpan } from "../../../components/EditableSpan/EditableSpan";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import { Task } from "./Task/Task";
import { TaskStatuses } from "../../../api/todolists-api";
import { FilterValuesType, TodolistDomainType } from "./todolists-reducer";
import { TaskDomainType } from "./tasks-reducer";

type TodolistPropsType = {
  todolist: TodolistDomainType;
  tasks: TaskDomainType[];
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (
    id: string,
    status: TaskStatuses,
    todolistId: string
  ) => void;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;

  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => void;
  demo?: boolean;
};

export const Todolist = memo(
  ({ demo = false, ...props }: TodolistPropsType) => {
    const addTask = useCallback(
      (title: string) => {
        props.addTask(title, props.todolist.id);
      },
      [props.addTask, props.todolist.id]
    );

    const removeTodolist = () => {
      props.removeTodolist(props.todolist.id);
    };
    const changeTodolistTitle = (title: string) => {
      props.changeTodolistTitle(props.todolist.id, title);
    };

    const onAllClickHandler = useCallback(
      () => props.changeFilter("all", props.todolist.id),
      [props.changeFilter, props.todolist.id]
    );
    const onActiveClickHandler = useCallback(
      () => props.changeFilter("active", props.todolist.id),
      [props.changeFilter, props.todolist.id]
    );
    const onCompletedClickHandler = useCallback(
      () => props.changeFilter("completed", props.todolist.id),
      [props.changeFilter, props.todolist.id]
    );

    let tasksForTodolist = props.tasks;

    if (props.todolist.filter === "active") {
      tasksForTodolist = tasksForTodolist.filter(
        (t) => t.status === TaskStatuses.New
      );
    }
    if (props.todolist.filter === "completed") {
      tasksForTodolist = tasksForTodolist.filter(
        (t) => t.status === TaskStatuses.Completed
      );
    }

    const removeTask = useCallback(
      (taskId: string) => {
        props.removeTask(taskId, props.todolist.id);
      },
      [props.removeTask, props.todolist.id]
    );

    const changeTaskStatus = useCallback(
      (taskId: string, status: TaskStatuses) => {
        props.changeTaskStatus(taskId, status, props.todolist.id);
      },
      [props.changeTaskStatus, props.todolist.id]
    );

    const changeTaskTitle = useCallback(
      (taskId: string, newTitle: string) => {
        props.changeTaskTitle(taskId, newTitle, props.todolist.id);
      },
      [props.changeTaskTitle, props.todolist.id]
    );

    return (
      <div>
        <h3>
          <EditableSpan
            value={props.todolist.title}
            onChange={changeTodolistTitle}
            disabled={props.todolist.entityStatus === "loading"}
          />
          <IconButton
            onClick={removeTodolist}
            disabled={props.todolist.entityStatus === "loading"}
          >
            <Delete />
          </IconButton>
        </h3>
        <AddItemForm
          addItem={addTask}
          disabled={props.todolist.entityStatus === "loading"}
        />
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
            variant={props.todolist.filter === "all" ? "outlined" : "text"}
            onClickHandler={onAllClickHandler}
            color={"inherit"}
          >
            All
          </ButtonExample>
          <ButtonExample
            variant={props.todolist.filter === "active" ? "outlined" : "text"}
            onClickHandler={onActiveClickHandler}
            color={"primary"}
          >
            Active
          </ButtonExample>
          <ButtonExample
            variant={
              props.todolist.filter === "completed" ? "outlined" : "text"
            }
            onClickHandler={onCompletedClickHandler}
            color={"secondary"}
          >
            Completed
          </ButtonExample>
        </div>
      </div>
    );
  }
);

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

type ButtonExamplePropsType = {
  variant: "outlined" | "text";
  onClickHandler: () => void;
  children: string;
  color: "secondary" | "primary" | "inherit";
};
