import React, { ChangeEvent, memo, useCallback } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { EditableSpan } from "../../../../components/EditableSpan/EditableSpan";
import { Delete } from "@mui/icons-material";
import { TaskStatuses, TaskType } from "../../../../api/todolists-api";

export type TaskPropsType = {
  task: TaskType;
  removeTask: (taskId: string) => void;
  changeTaskStatus: (id: string, status: TaskStatuses) => void;
  changeTaskTitle: (taskId: string, newTitle: string) => void;
};

export const Task = memo((props: TaskPropsType) => {
  const onRemoveClickHandler = () => props.removeTask(props.task.id);

  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(
      props.task.id,
      e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
    );
  };

  const onChangeTitleHandler = useCallback(
    (newValue: string) => {
      props.changeTaskTitle(props.task.id, newValue);
    },
    [props.changeTaskTitle, props.task.id]
  );

  return (
    <div
      key={props.task.id}
      className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}
    >
      <Checkbox
        checked={props.task.status === TaskStatuses.Completed}
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
