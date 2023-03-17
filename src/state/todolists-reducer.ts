import { todolistsAPI, TodolistType } from "../api/todolists-api";
import { ThunkAction } from "redux-thunk";
import { AppRootStateType } from "./store";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  todolistId: string;
};

export type AddTodolistActionType = ReturnType<typeof todolistsAC.addTodolist>;
type ChangeTodolistTitleActionType = ReturnType<
  typeof todolistsAC.changeTodolistTitle
>;
type ChangeTodolistFilterActionType = ReturnType<
  typeof todolistsAC.changeTodolistFilter
>;
export type SetTodolistsActionType = ReturnType<
  typeof todolistsAC.setTodolists
>;
type TodolistsReducerThunkType = ThunkAction<
  void,
  AppRootStateType,
  unknown,
  TodolistsReducerActionsType
>;

export type TodolistsReducerActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType;

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & { filter: FilterValuesType };

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

export const todolistsTC = {
  getTodolist: (): TodolistsReducerThunkType => (dispatch) => {
    todolistsAPI.getTodolists().then((res) => {
      dispatch(todolistsAC.setTodolists(res.data));
    });
  },

  removeTodolist:
    (todolistId: string): TodolistsReducerThunkType =>
    (dispatch) => {
      todolistsAPI.deleteTodolist(todolistId).then((res) => {
        res.resultCode === 0 &&
          dispatch(todolistsAC.removeTodolist(todolistId));
      });
    },
  addTodolist:
    (todolistTitle: string): TodolistsReducerThunkType =>
    (dispatch) => {
      todolistsAPI
        .createTodolist(todolistTitle)
        .then((res) => dispatch(todolistsAC.addTodolist(res.data.data.item)));
    },
  changeTodolistTitle:
    (todolistId: string, title: string): TodolistsReducerThunkType =>
    (dispatch) => {
      todolistsAPI
        .updateTodolistTitle(todolistId, title)
        .then(
          (res) =>
            res.data.resultCode === 0 &&
            dispatch(todolistsAC.changeTodolistTitle(todolistId, title))
        );
    },
};

export const todolistsAC = {
  removeTodolist: (todolistId: string): RemoveTodolistActionType => ({
    type: "REMOVE-TODOLIST",
    todolistId,
  }),

  addTodolist: (todolist: TodolistType) =>
    ({ type: "ADD-TODOLIST", todolist } as const),

  changeTodolistTitle: (todolistId: string, title: string) =>
    ({
      type: "CHANGE-TODOLIST-TITLE",
      todolistId,
      title,
    } as const),

  changeTodolistFilter: (todolistId: string, filter: FilterValuesType) =>
    ({ type: "CHANGE-TODOLIST-FILTER", todolistId, filter } as const),

  setTodolists: (todolists: TodolistType[]) =>
    ({
      type: "SET-TODOLISTS",
      todolists,
    } as const),
};
