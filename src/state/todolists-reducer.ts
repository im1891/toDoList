import { FilterValuesType, TodolistType } from "../App";
import { v1 } from "uuid";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  todolistId: string;
};

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type ChangeTodolistTitleActionType = ReturnType<
  typeof changeTodolistTitleAC
>;
export type ChangeTodolistFilterActionType = ReturnType<
  typeof changeTodolistFilterAC
>;

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

const initialState: Array<TodolistType> = [];

export const todolistsReducer = (
  state: Array<TodolistType> = initialState,
  action: ActionsType
): Array<TodolistType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id != action.todolistId);
    }
    case "ADD-TODOLIST": {
      return [
        {
          id: action.todolistId,
          title: action.title,
          filter: "all",
        },
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
    default:
      return state;
  }
};

export const removeTodolistAC = (
  todolistId: string
): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", todolistId };
};

export const addTodolistAC = (title: string) => {
  return { type: "ADD-TODOLIST", title, todolistId: v1() } as const;
};

export const changeTodolistTitleAC = (todolistId: string, title: string) => {
  return { type: "CHANGE-TODOLIST-TITLE", todolistId, title } as const;
};

export const changeTodolistFilterAC = (
  todolistId: string,
  filter: FilterValuesType
) => {
  return { type: "CHANGE-TODOLIST-FILTER", todolistId, filter } as const;
};
