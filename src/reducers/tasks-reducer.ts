import { v1 } from "uuid";
import { AddTodoListACType, RemoveTodoListACType } from "./todoLists-reducer";

export type TasksActionTypes =
  | RemoveTaskACType
  | AddTaskACType
  | ChangeTaskStatusACType
  | ChangeTaskTitleACType
  | AddTodoListACType
  | RemoveTodoListACType;

type RemoveTaskACType = ReturnType<typeof removeTaskAC>;
type AddTaskACType = ReturnType<typeof addTaskAC>;
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>;
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>;

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TasksStateType = {
  [key: string]: TaskType[];
};

const initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: TasksActionTypes
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK":
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].filter(
          (ts) => ts.id !== action.payload.taskId
        ),
      };
    case "ADD-TASK":
      let newTask: TaskType = {
        id: v1(),
        title: action.payload.newTaskTitle,
        isDone: false,
      };
      return {
        ...state,
        [action.payload.todoListId]: [
          newTask,
          ...state[action.payload.todoListId],
        ],
      };
    case "CHANGE-TASK-STATUS":
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].map(
          (ts) =>
            ts.id === action.payload.taskId
              ? {
                  ...ts,
                  isDone: action.payload.newIsDone,
                }
              : ts
        ),
      };
    case "CHANGE-TASK-TITLE":
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].map(
          (ts) =>
            ts.id === action.payload.taskId
              ? {
                  ...ts,
                  title: action.payload.newTaskTitle,
                }
              : ts
        ),
      };
    case "ADD-TODOLIST":
      return { ...state, [action.payload.newTodoListId]: [] };
    case "REMOVE-TODOLIST":
      /* let stateCopy = {...state}
                              delete stateCopy[action.payload.todoListId]
                              return stateCopy*/
      let {
        [action.payload.todoListId]: [],
        ...rest
      } = { ...state };
      return rest;
    default:
      return state;
  }
};

export const removeTaskAC = (todoListId: string, taskId: string) => {
  return {
    type: "REMOVE-TASK",
    payload: {
      todoListId,
      taskId,
    },
  } as const;
};

export const addTaskAC = (todoListId: string, newTaskTitle: string) => {
  return {
    type: "ADD-TASK",
    payload: {
      todoListId,
      newTaskTitle,
    },
  } as const;
};

export const changeTaskStatusAC = (
  todoListId: string,
  taskId: string,
  newIsDone: boolean
) => {
  return {
    type: "CHANGE-TASK-STATUS",
    payload: {
      todoListId,
      taskId,
      newIsDone,
    },
  } as const;
};

export const changeTaskTitleAC = (
  todoListId: string,
  taskId: string,
  newTaskTitle: string
) => {
  return {
    type: "CHANGE-TASK-TITLE",
    payload: {
      todoListId,
      taskId,
      newTaskTitle,
    },
  } as const;
};
