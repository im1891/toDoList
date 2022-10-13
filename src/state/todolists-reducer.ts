import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../App";

export const todolistsReducer = (state: TodoListType[], action: AllTypesAC) => {
    switch (action.type) {

        case 'REMOVE-TODOLIST': {
            return state.filter(td => td.id !== action.payload.todolistId)
        }

        case 'ADD-TODOLIST': {
            let newTodolistId = v1();
            let newTodolist: TodoListType = {id: newTodolistId, title: action.payload.title, filter: 'all'};
            return [...state, newTodolist]
        }
        case 'CHANGE-FILTER': {
            return state.map(td => td.id === action.payload.todolistId ? {
                ...td,
                filter: action.payload.filterValue
            } : td)
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(td => td.id === action.payload.todolistId ? {...td, title: action.payload.title} : td)
        }
        default:
            return state
    }
}


type AllTypesAC = removeTodolistACType | addTodolistACType | changeFilterACType | changeTodolistTitleACType

type removeTodolistACType = ReturnType<typeof removeTodolistAC>;

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}

type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title
        }
    } as const
}

type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (filterValue: FilterValuesType, todolistId: string) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            filterValue,
            todolistId
        }
    } as const
}


type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>

export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId,
            title
        }
    } as const
}