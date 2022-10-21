import React, { ChangeEvent } from "react";
import { TaskType } from "../../App";
import { AddItemForm } from "../AddItemForm";
import { EditableSpan } from "../EditableSpan";
import s from "./TodoList.module.css";
import { Delete } from "@mui/icons-material";
import { Button, Checkbox, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../store";
import {
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
} from "../../reducers/todoLists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "../../reducers/tasks-reducer";

type TodoListPropsType = {
  todoListId: string;
  title: string;
  filter: FilterValuesType;
};

export type FilterValuesType = "all" | "active" | "completed";

export const TodoListRedux: React.FC<TodoListPropsType> = (props) => {
  const { todoListId, title, filter } = props;

  const dispatch = useDispatch();

  const tasks = useSelector<AppStateType, TaskType[]>(
    (state) => state.tasks[todoListId]
  );

  let taskForTodoList = tasks;

  if (filter === "active") {
    taskForTodoList = tasks.filter((ts) => !ts.isDone);
  }
  if (filter === "completed") {
    taskForTodoList = tasks.filter((ts) => ts.isDone);
  }

  const onChangeTodoListFilterHandler = (newFilterValue: FilterValuesType) => {
    dispatch(changeTodoListFilterAC(todoListId, newFilterValue));
  };

  const removeTodoListHandler = () => {
    dispatch(removeTodoListAC(todoListId));
  };

  const addNewTask = (newTaskTitle: string) => {
    dispatch(addTaskAC(todoListId, newTaskTitle));
  };

  const onChangeTodoListTitleHandler = (newTitle: string) => {
    dispatch(changeTodoListTitleAC(todoListId, newTitle));
  };

  return (
    <div>
      <h3>
        <EditableSpan value={title} onChange={onChangeTodoListTitleHandler} />
        <IconButton onClick={removeTodoListHandler} aria-label="delete">
          <Delete />
        </IconButton>
      </h3>
      <div>
        <AddItemForm callBack={addNewTask} />
      </div>
      <ul>
        {taskForTodoList.map((ts) => {
          const onChangeTaskStatusHandler = (
            e: ChangeEvent<HTMLInputElement>
          ) => {
            dispatch(
              changeTaskStatusAC(todoListId, ts.id, e.currentTarget.checked)
            );
          };

          const removeTaskHandler = () => {
            dispatch(removeTaskAC(todoListId, ts.id));
          };

          const onChangeTaskTitleHandler = (newTitle: string) => {
            dispatch(changeTaskTitleAC(todoListId, ts.id, newTitle));
          };
          return (
            <div key={ts.id} className={ts.isDone ? s.completed : ""}>
              <Checkbox
                defaultChecked
                color="success"
                onChange={onChangeTaskStatusHandler}
                checked={ts.isDone}
              />
              <EditableSpan
                value={ts.title}
                onChange={onChangeTaskTitleHandler}
              />
              <IconButton onClick={removeTaskHandler} size="small">
                <Delete />
              </IconButton>
            </div>
          );
        })}
      </ul>
      <Button
        color="secondary"
        variant={filter === "all" ? "outlined" : "contained"}
        onClick={() => onChangeTodoListFilterHandler("all")}
      >
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "contained"}
        onClick={() => onChangeTodoListFilterHandler("active")}
        color="error"
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "contained"}
        onClick={() => onChangeTodoListFilterHandler("completed")}
        color="success"
      >
        Completed
      </Button>
    </div>
  );
};
