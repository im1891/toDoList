import { tasksReducer, TasksReducerActionTypes } from '../features/TodolistsList/tasks-reducer'
import { todolistsReducer, TodolistsReducerActionTypes } from '../features/TodolistsList/todolists-reducer'
import {
	AnyAction,
	applyMiddleware,
	combineReducers,
	legacy_createStore as createStore
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { appReducer, AppReducerActionsType } from './app-reducer'
import { authReducer, LoginReducerActionsType } from '../features/Login/auth-reducer'


const rootReducer = combineReducers({
	tasks: tasksReducer,
	todolists: todolistsReducer,
	app: appReducer,
	auth: authReducer
})

export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
)

export type AppRootStateType = ReturnType<typeof rootReducer>
export const useAppDispatch = () =>
	useDispatch<ThunkDispatch<AppRootStateType, any, AnyAction>>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> =
	useSelector

export type AppActionTypes = TodolistsReducerActionTypes | TasksReducerActionTypes | AppReducerActionsType | LoginReducerActionsType

export type AppThunkType<ReturnType = void> = ThunkAction<
	ReturnType,
	AppRootStateType,
	unknown,
	AppActionTypes
>

// @ts-ignore
window.store = store
