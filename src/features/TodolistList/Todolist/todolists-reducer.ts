import { todolistsAPI, TodolistType } from "../../../api/todolists-api";
import { ThunkAction } from "redux-thunk";
import { AppRootStateType } from "../../../app/store";

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
      return [{ ...action.todolist, filter: "all" }, ...state];
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
      return action.todolists.map((td) => ({ ...td, filter: "all" }));
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

//Thunks/////////////////////////////////////////////////////////////////////
export const getTodolistTC = (): TodolistsReducerThunkType => (dispatch) => {
  todolistsAPI.getTodolists().then((res) => {
    dispatch(setTodolistsAC(res.data));
  });
};

export const removeTodolistTC =
  (todolistId: string): TodolistsReducerThunkType =>
  (dispatch) => {
    todolistsAPI.deleteTodolist(todolistId).then((res) => {
      res.resultCode === 0 && dispatch(removeTodolistAC(todolistId));
    });
  };

export const addTodolistTC =
  (todolistTitle: string): TodolistsReducerThunkType =>
  (dispatch) => {
    todolistsAPI
      .createTodolist(todolistTitle)
      .then((res) => dispatch(addTodolistAC(res.data.data.item)));
  };

export const changeTodolistTitleTC =
  (todolistId: string, title: string): TodolistsReducerThunkType =>
  (dispatch) => {
    todolistsAPI
      .updateTodolistTitle(todolistId, title)
      .then(
        (res) =>
          res.data.resultCode === 0 &&
          dispatch(changeTodolistTitleAC(todolistId, title))
      );
  };

//Types
type TodolistsReducerThunkType = ThunkAction<
  void,
  AppRootStateType,
  unknown,
  TodolistsReducerActionsType
>;

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;

export type TodolistsReducerActionsType =
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | SetTodolistsActionType
  | RemoveTodolistActionType
  | AddTodolistActionType;

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & { filter: FilterValuesType };
