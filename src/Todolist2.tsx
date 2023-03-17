import React, { memo, useCallback, useEffect } from "react";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Task } from "./Task";
import { TaskStatuses, TaskType } from "./api/todolists-api";
import { FilterValuesType } from "./state/todolists-reducer";
import { useAppDispatch } from "./custom_hooks/useAppDispatch";
import { useAppSelector } from "./custom_hooks/useAppSelector";
import { tasksTC } from "./state/tasks-reducer";

type TodolistPropsType = {
  id: string;
  title: string;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
  filter: FilterValuesType;
};

export const Todolist2 = memo((props: TodolistPropsType) => {
  const dispatch = useAppDispatch();

  /* const tasks = useSelector<AppRootStateType, TaskType[]>(
                       (state) => state.tasks[props.id]
                     ); */
  const tasks = useAppSelector<TaskType[]>((state) => state.tasks[props.id]);

  useEffect(() => {
    dispatch(tasksTC.getTasks(props.id));
  }, []);

  const addTask = useCallback(
    (title: string) => {
      dispatch(tasksTC.addTask(props.id, title));
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
      dispatch(tasksTC.removeTask(props.id, taskId));
    },
    [props.id]
  );

  const changeTaskStatus = useCallback(
    (taskId: string, status: TaskStatuses) => {
      dispatch(tasksTC.updateTask(props.id, taskId, { status }));
    },
    [props.id]
  );

  const changeTaskTitle = useCallback(
    (taskId: string, newTitle: string) => {
      dispatch(tasksTC.updateTask(props.id, taskId, { title: newTitle }));
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
