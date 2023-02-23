import { TasksStateType } from "../App";
import { TaskType } from "../Todolist";
import { v1 } from "uuid";
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
} from "./todolists-reducer";

export type AddTaskActionType = {
  type: "ADD-TASK";
  todolistId: string;
  title: string;
};

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;

const initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(
          (t) => t.id !== action.taskId
        ),
      };
    }
    case "ADD-TASK": {
      const newTask: TaskType = {
        id: v1(),
        title: action.title,
        isDone: false,
      };

      return {
        ...state,
        [action.todolistId]: [newTask, ...state[action.todolistId]],
      };
    }
    case "CHANGE-TASK-STATUS": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.taskId
            ? {
                ...t,
                isDone: action.isDone,
              }
            : t
        ),
      };
    }

    case "CHANGE-TASK-TITLE": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.taskId
            ? {
                ...t,
                title: action.title,
              }
            : t
        ),
      };
    }
    case "ADD-TODOLIST": {
      return {
        ...state,
        [action.todolistId]: [],
      };
    }
    case "REMOVE-TODOLIST": {
      const {
        [action.todolistId]: [],
        ...restKeys
      } = { ...state };
      return restKeys;

      // ---------------------------OR---------------------------

      /*   const copyState = { ...state };
                                       delete copyState[action.id];
                                       return copyState;*/
    }
    default:
      return state;
  }
};

export const addTaskAC = (
  title: string,
  todolistId: string
): AddTaskActionType => {
  return { type: "ADD-TASK", title, todolistId };
};

export const removeTaskAC = (taskId: string, todolistId: string) => {
  return {
    type: "REMOVE-TASK",
    taskId,
    todolistId,
  } as const;
};

export const changeTaskStatusAC = (
  taskId: string,
  isDone: boolean,
  todolistId: string
) => {
  return { type: "CHANGE-TASK-STATUS", isDone, todolistId, taskId } as const;
};

export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todolistId: string
) => {
  return { type: "CHANGE-TASK-TITLE", title, todolistId, taskId } as const;
};
