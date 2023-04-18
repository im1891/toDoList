import {
  ResponseType,
  ResultStatus,
  todolistsAPI,
  TodolistType,
} from "../../../api/todolists-api";
import { ThunkAction } from "redux-thunk";
import { AppRootStateType } from "../../../app/store";
import {
  RequestStatusType,
  setAppStatus,
  SetAppStatusType,
} from "../../../app/app-reducer";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../../utils/error-utils";
import { AxiosError } from "axios";
import { getTasksTC } from "./tasks-reducer";

const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (
  state: Array<TodolistDomainType> = initialState,
  action: TodolistsReducerActionsType
): Array<TodolistDomainType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id != action.todolistId);
    }
    case "ADD-TODOLIST": {
      return [
        { ...action.todolist, filter: "all", entityStatus: "idle" },
        ...state,
      ];
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map((td) =>
        td.id === action.todolistId ? { ...td, title: action.title } : td
      );
    }
    case "CHANGE-TODOLIST-FILTER": {
      return state.map((td) =>
        td.id === action.todolistId ? { ...td, filter: action.filter } : td
      );
    }
    case "SET-TODOLISTS": {
      return action.todolists.map((td) => ({
        ...td,
        filter: "all",
        entityStatus: "idle",
      }));
    }
    case "CHANGE-TODOLIST-ENTITY-STATUS":
      return state.map((tl) =>
        tl.id === action.todolistId
          ? { ...tl, entityStatus: action.status }
          : tl
      );
    case "CLEAR-TODOS-DATA": {
      return [];
    }
    default:
      return state;
  }
};

//Actions/////////////////////////////////////////////////////////////////////
export const removeTodolistAC = (todolistId: string) =>
  ({
    type: "REMOVE-TODOLIST",
    todolistId,
  } as const);

export const addTodolistAC = (todolist: TodolistType) =>
  ({ type: "ADD-TODOLIST", todolist } as const);

export const changeTodolistTitleAC = (todolistId: string, title: string) =>
  ({
    type: "CHANGE-TODOLIST-TITLE",
    todolistId,
    title,
  } as const);

export const changeTodolistFilterAC = (
  todolistId: string,
  filter: FilterValuesType
) => ({ type: "CHANGE-TODOLIST-FILTER", todolistId, filter } as const);

export const setTodolistsAC = (todolists: TodolistType[]) =>
  ({
    type: "SET-TODOLISTS",
    todolists,
  } as const);

export const changeTodolistEntityStatusAC = (
  status: RequestStatusType,
  todolistId: string
) =>
  ({
    type: "CHANGE-TODOLIST-ENTITY-STATUS",
    status,
    todolistId,
  } as const);

export const clearTodosDataAC = () =>
  ({
    type: "CLEAR-TODOS-DATA",
  } as const);
//Thunks/////////////////////////////////////////////////////////////////////
export const getTodolistTC = (): TodolistsReducerThunkType => (dispatch) => {
  dispatch(setAppStatus("loading"));

  todolistsAPI
    .getTodolists()
    .then((res) => {
      dispatch(setTodolistsAC(res));
      dispatch(setAppStatus("succeeded"));
      return res;
    })
    .then((todos) => {
      todos.forEach((tl) => {
        dispatch(getTasksTC(tl.id));
      });
    })
    .catch((e: AxiosError<{ message: string }>) => {
      const error = e.response ? e.response.data.message : e.message;
      handleServerNetworkError(error, dispatch);
    });
};

export const removeTodolistTC =
  (todolistId: string): TodolistsReducerThunkType =>
  (dispatch) => {
    dispatch(changeTodolistEntityStatusAC("loading", todolistId));
    dispatch(setAppStatus("loading"));

    todolistsAPI
      .deleteTodolist(todolistId)
      .then((res) => {
        if (res.resultCode === ResultStatus.OK) {
          dispatch(removeTodolistAC(todolistId));
          dispatch(setAppStatus("succeeded"));
        } else {
          const data: ResponseType = {
            resultCode: res.resultCode,
            messages: res.messages,
            data: { messages: res.messages },
          };
          handleServerAppError(data, dispatch);
        }
      })
      .catch((e: AxiosError<{ message: string }>) => {
        const error = e.response ? e.response.data.message : e.message;
        handleServerNetworkError(error, dispatch);
      });
  };

export const addTodolistTC =
  (todolistTitle: string): TodolistsReducerThunkType =>
  (dispatch) => {
    dispatch(setAppStatus("loading"));
    todolistsAPI
      .createTodolist(todolistTitle)
      .then((res) => {
        if (res.data.resultCode === ResultStatus.OK) {
          dispatch(addTodolistAC(res.data.data.item));
          dispatch(setAppStatus("succeeded"));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((e: AxiosError<{ message: string }>) => {
        const error = e.response ? e.response.data.message : e.message;
        handleServerNetworkError(error, dispatch);
      });
  };

export const changeTodolistTitleTC =
  (todolistId: string, title: string): TodolistsReducerThunkType =>
  (dispatch) => {
    dispatch(setAppStatus("loading"));
    todolistsAPI
      .updateTodolistTitle(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === ResultStatus.OK) {
          dispatch(changeTodolistTitleAC(todolistId, title));
          dispatch(setAppStatus("succeeded"));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((e: AxiosError<{ message: string }>) => {
        const error = e.response ? e.response.data.message : e.message;
        handleServerNetworkError(error, dispatch);
      });
  };

//Types
type TodolistsReducerThunkType = ThunkAction<
  void,
  AppRootStateType,
  unknown,
  TodolistsReducerActionsType
>;

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type removeTodolistType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type ChangeTodolistEntityStatusType = ReturnType<
  typeof changeTodolistEntityStatusAC
>;
export type clearTodosDataACType = ReturnType<typeof clearTodosDataAC>;

export type TodolistsReducerActionsType =
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | ChangeTodolistEntityStatusType
  | SetTodolistsActionType
  | removeTodolistType
  | AddTodolistActionType
  | SetAppStatusType
  | clearTodosDataACType;

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
