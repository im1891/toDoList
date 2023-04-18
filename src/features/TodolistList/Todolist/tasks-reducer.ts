import {
  ResultStatus,
  TaskType,
  todolistsAPI,
  UpdateTaskModelType,
} from "../../../api/todolists-api";
import { ThunkAction } from "redux-thunk";
import {
  AddTodolistActionType,
  clearTodosDataACType,
  removeTodolistType,
  SetTodolistsActionType,
} from "./todolists-reducer";
import { AppRootStateType } from "../../../app/store";
import {
  RequestStatusType,
  SetAppErrorType,
  setAppStatus,
  SetAppStatusType,
} from "../../../app/app-reducer";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../../utils/error-utils";
import axios, { AxiosError } from "axios";

const initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: TasksReducerActionTypes
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
      return {
        ...state,
        [action.task.todoListId]: [
          { ...action.task, entityStatus: "idle" },
          ...state[action.task.todoListId],
        ],
      };
    }
    case "UPDATE-TASK": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.taskId
            ? {
                ...t,
                ...action.model,
              }
            : t
        ),
      };
    }
    case "ADD-TODOLIST": {
      return {
        ...state,
        [action.todolist.id]: [],
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
    case "SET-TODOLISTS": {
      let stateCopy = { ...state };
      action.todolists.forEach((td) => (stateCopy[td.id] = []));
      return stateCopy;
    }

    case "SET-TASKS": {
      return {
        ...state,
        [action.todolistId]: action.tasks.map((ts) => ({
          ...ts,
          entityStatus: "idle",
        })),
      };
    }
    case "CHANGE-TASK-ENTITY-STATUS": {
      return {
        ...state,
        [action.payload.todlistId]: state[action.payload.todlistId].map((ts) =>
          ts.id === action.payload.taskId
            ? {
                ...ts,
                entityStatus: action.payload.status,
              }
            : ts
        ),
      };
    }
    case "CLEAR-TODOS-DATA": {
      return {};
    }
    default:
      return state;
  }
};

//Actions/////////////////////////////////////////////////////////////////////
export const addTaskAC = (task: TaskType) =>
  ({
    type: "ADD-TASK",
    task,
  } as const);

export const removeTaskAC = (taskId: string, todolistId: string) =>
  ({
    type: "REMOVE-TASK",
    taskId,
    todolistId,
  } as const);

export const updateTaskAC = (
  taskId: string,
  model: UpdateDomainTaskModelType,
  todolistId: string
) => ({ type: "UPDATE-TASK", model, todolistId, taskId } as const);

export const setTasksAC = (tasks: TaskType[], todolistId: string) =>
  ({
    type: "SET-TASKS",
    tasks,
    todolistId,
  } as const);

export const changeTaskEntityStatusAC = (
  todlistId: string,
  taskId: string,
  status: RequestStatusType
) =>
  ({
    type: "CHANGE-TASK-ENTITY-STATUS",
    payload: {
      todlistId,
      taskId,
      status,
    },
  } as const);

//Thunks/////////////////////////////////////////////////////////////////////
export const getTasksTC =
  (todolistId: string): TasksReducerThunkType =>
  async (dispatch) => {
    dispatch(setAppStatus("loading"));

    try {
      const res = await todolistsAPI.getTasks(todolistId);
      dispatch(setTasksAC(res.data.items, todolistId));
      dispatch(setAppStatus("succeeded"));
    } catch (e) {
      const err = e as Error | AxiosError<{ message: string }>;
      if (axios.isAxiosError(err)) {
        const errData = err.response?.data as { message: string };
        const error = err.response?.data ? errData.message : err.message;
        handleServerNetworkError(error, dispatch);
      }
    }
  };

export const removeTaskTC =
  (todolistId: string, taskId: string): TasksReducerThunkType =>
  (dispatch) => {
    dispatch(setAppStatus("loading"));
    dispatch(changeTaskEntityStatusAC(todolistId, taskId, "loading"));

    todolistsAPI
      .deleteTask(todolistId, taskId)
      .then((res) => {
        if (res.data.resultCode === ResultStatus.OK) {
          dispatch(removeTaskAC(taskId, todolistId));
          dispatch(setAppStatus("succeeded"));
          dispatch(changeTaskEntityStatusAC(todolistId, taskId, "succeeded"));
        } else {
          handleServerAppError(res.data, dispatch);
          dispatch(changeTaskEntityStatusAC(todolistId, taskId, "failed"));
        }
      })
      .catch((e: AxiosError<{ message: string }>) => {
        const error = e.response?.data ? e.response.data.message : e.message;
        handleServerNetworkError(error, dispatch);
        dispatch(changeTaskEntityStatusAC(todolistId, taskId, "failed"));
      });
  };

export const addTaskTC =
  (todolistId: string, title: string): TasksReducerThunkType =>
  (dispatch) => {
    dispatch(setAppStatus("loading"));

    todolistsAPI
      .createTask(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === ResultStatus.OK) {
          dispatch(addTaskAC(res.data.data.item));
          dispatch(setAppStatus("succeeded"));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((e: AxiosError<{ message: string }>) => {
        const error = e.response?.data ? e.response.data.message : e.message;
        handleServerNetworkError(error, dispatch);
      });
  };
export const updateTaskTC =
  (
    todolistId: string,
    taskId: string,
    domainModel: UpdateDomainTaskModelType
  ): TasksReducerThunkType =>
  (dispatch, getState) => {
    const task = getState().tasks[todolistId].find((ts) => ts.id === taskId);
    if (task) {
      const updatedModel: UpdateTaskModelType = {
        title: task.title,
        status: task.status,
        description: task.description,
        startDate: task.startDate,
        priority: task.priority,
        deadline: task.deadline,
        ...domainModel,
      };
      dispatch(setAppStatus("loading"));
      dispatch(changeTaskEntityStatusAC(todolistId, taskId, "loading"));

      todolistsAPI
        .updateTask(todolistId, taskId, updatedModel)
        .then((res) => {
          if (res.data.resultCode === ResultStatus.OK) {
            dispatch(updateTaskAC(taskId, updatedModel, todolistId));
            dispatch(setAppStatus("succeeded"));
            dispatch(changeTaskEntityStatusAC(todolistId, taskId, "succeeded"));
          } else {
            handleServerAppError(res.data, dispatch);
            dispatch(changeTaskEntityStatusAC(todolistId, taskId, "failed"));
          }
        })
        .catch((e: AxiosError<{ message: string }>) => {
          const error = e.response?.data ? e.response.data.message : e.message;
          handleServerNetworkError(error, dispatch);
          dispatch(changeTaskEntityStatusAC(todolistId, taskId, "failed"));
        });
    }
  };

//Types
type TasksReducerThunkType = ThunkAction<
  void,
  AppRootStateType,
  any,
  TasksReducerActionTypes
>;

export type TasksReducerActionTypes =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof changeTaskEntityStatusAC>
  | removeTodolistType
  | SetTodolistsActionType
  | AddTodolistActionType
  | SetAppErrorType
  | SetAppStatusType
  | clearTodosDataACType;

type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: number;
  priority?: number;
  startDate?: string;
  deadline?: string;
};

export type TaskDomainType = TaskType & { entityStatus: RequestStatusType };

export type TasksStateType = {
  [key: string]: TaskDomainType[];
};
