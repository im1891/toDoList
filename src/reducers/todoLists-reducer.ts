import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";


export const todoListsReducer = (state: TodoListType[], action: ActionTypes): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(td => td.id !== action.payload.todoListId)
        case 'ADD-TODOLIST':
            let newTodoList: TodoListType = {
                id: action.payload.newTodoListId,
                title: action.payload.newTodoListTitle,
                filter: 'all'
            }
            return [...state, newTodoList]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(td => td.id === action.payload.todoListId ? {...td, title: action.payload.newTitle} : td)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(td => td.id === action.payload.todoListId ? {
                ...td,
                filter: action.payload.newFilterValue
            } : td)
        default:
            throw new Error('I don\'t understand this type')
    }

}
type ActionTypes = RemoveTodoListACType | AddTodoListACType | ChangeTodoListTitleACType | ChangeTodoListFilterACType

export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todoListId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todoListId
        }
    } as const
}

export type AddTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (newTodoListTitle: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            newTodoListTitle,
            newTodoListId: v1()
        }
    } as const
}

type ChangeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>
export const changeTodoListTitleAC = (todoListId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            newTitle,
            todoListId
        }
    } as const
}


type ChangeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>
export const changeTodoListFilterAC = (todoListId: string, newFilterValue: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todoListId,
            newFilterValue
        }
    } as const
}