import { FilterValuesType } from "../App";
import { v1 } from "uuid";

export type TodoListsActionTypes =
  | RemoveTodoListACType
  | AddTodoListACType
  | ChangeTodoListTitleACType
  | ChangeTodoListFilterACType;

export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>;
export type AddTodoListACType = ReturnType<typeof addTodoListAC>;
type ChangeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>;
type ChangeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>;

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

const initialState: TodoListType[] = [];

export const todoListsReducer = (
  state: TodoListType[] = initialState,
  action: TodoListsActionTypes
): TodoListType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((td) => td.id !== action.payload.todoListId);
    case "ADD-TODOLIST":
      let newTodoList: TodoListType = {
        id: action.payload.newTodoListId,
        title: action.payload.newTodoListTitle,
        filter: "all",
      };
      return [newTodoList, ...state];
    case "CHANGE-TODOLIST-TITLE":
      return state.map((td) =>
        td.id === action.payload.todoListId
          ? { ...td, title: action.payload.newTitle }
          : td
      );
    case "CHANGE-TODOLIST-FILTER":
      return state.map((td) =>
        td.id === action.payload.todoListId
          ? {
              ...td,
              filter: action.payload.newFilterValue,
            }
          : td
      );
    default:
      return state;
  }
};

export const removeTodoListAC = (todoListId: string) => {
  return {
    type: "REMOVE-TODOLIST",
    payload: {
      todoListId,
    },
  } as const;
};

export const addTodoListAC = (newTodoListTitle: string) => {
  return {
    type: "ADD-TODOLIST",
    payload: {
      newTodoListTitle,
      newTodoListId: v1(),
    },
  } as const;
};

export const changeTodoListTitleAC = (todoListId: string, newTitle: string) => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    payload: {
      newTitle,
      todoListId,
    },
  } as const;
};

export const changeTodoListFilterAC = (
  todoListId: string,
  newFilterValue: FilterValuesType
) => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    payload: {
      todoListId,
      newFilterValue,
    },
  } as const;
};
