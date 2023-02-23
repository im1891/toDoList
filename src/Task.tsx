import React, { ChangeEvent, memo, useCallback } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { EditableSpan } from "./EditableSpan";
import { Delete } from "@mui/icons-material";
import { TaskType } from "./Todolist";

export type TaskPropsType = {
  task: TaskType;
  removeTask: (taskId: string) => void;
  changeTaskStatus: (id: string, isDone: boolean) => void;
  changeTaskTitle: (taskId: string, newTitle: string) => void;
};

export const Task = memo((props: TaskPropsType) => {
  const onRemoveClickHandler = () => props.removeTask(props.task.id);

  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(props.task.id, e.currentTarget.checked);
  };

  const onChangeTitleHandler = useCallback(
    (newValue: string) => {
      props.changeTaskTitle(props.task.id, newValue);
    },
    [props.changeTaskTitle, props.task.id]
  );

  return (
    <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
      <Checkbox
        checked={props.task.isDone}
        color="primary"
        onChange={onChangeStatusHandler}
      />

      <EditableSpan value={props.task.title} onChange={onChangeTitleHandler} />
      <IconButton onClick={onRemoveClickHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});
