import React, { ChangeEvent } from "react";
import { FilterValuesType, TaskType } from "./App";
import { EditableSpan } from "./сomponents/EditableSpan";
import { SuperInput } from "./сomponents/SuperInput";

type PropsType = {
  todoListId: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string, todoListId: string) => void;
  changeFilter: (todoListId: string, value: FilterValuesType) => void;
  addTask: (title: string, todoListId: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todoListId: string
  ) => void;
  filter: FilterValuesType;
  deleteList: (todoListId: string) => void;
  changeTask: (
    todoListId: string,
    taskId: string,
    currentTitle: string
  ) => void;

  editTodoListTitle: (todoListId: string, currentTitle: string) => void;
};

export function ToDoList(props: PropsType) {
  const onAllClickHandler = () => props.changeFilter(props.todoListId, "all");

  const onActiveClickHandler = () =>
    props.changeFilter(props.todoListId, "active");

  const onCompletedClickHandler = () =>
    props.changeFilter(props.todoListId, "completed");

  const addTaskHandler = (newTitle: string) => {
    props.addTask(newTitle, props.todoListId);
  };

  const editTodoListTitleHandler = (currentTitle: string) => {
    props.editTodoListTitle(props.todoListId, currentTitle);
  };

  const changeTaskHandler = (currentTitle: string, taskId: string) => {
    props.changeTask(props.todoListId, taskId, currentTitle);
  };

  return (
    <div>
      <h3>
        {/* eslint-disable-next-line react/jsx-no-undef */}
        <EditableSpan title={props.title} callBack={editTodoListTitleHandler} />
        <button onClick={() => props.deleteList(props.todoListId)}>Del</button>
      </h3>

      {/* eslint-disable-next-line react/jsx-no-undef */}
      <SuperInput callBack={addTaskHandler} />

      <ul>
        {props.tasks.map((t) => {
          const onClickHandler = () => props.removeTask(t.id, props.todoListId);
          const onChangeCheckBoxHandler = (
            e: ChangeEvent<HTMLInputElement>
          ) => {
            props.changeTaskStatus(
              t.id,
              e.currentTarget.checked,
              props.todoListId
            );
          };

          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                onChange={onChangeCheckBoxHandler}
                checked={t.isDone}
              />
              <EditableSpan
                title={t.title}
                callBack={(currentTitle) =>
                  changeTaskHandler(currentTitle, t.id)
                }
              />
              <button onClick={onClickHandler}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={onAllClickHandler}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={onActiveClickHandler}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={onCompletedClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
