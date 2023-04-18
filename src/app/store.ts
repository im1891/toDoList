import {
  tasksReducer,
  TasksReducerActionTypes,
} from "../features/TodolistList/Todolist/tasks-reducer";
import {
  todolistsReducer,
  TodolistsReducerActionsType,
} from "../features/TodolistList/Todolist/todolists-reducer";
import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
  Store,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { appReducer } from "./app-reducer";
import { authReducer } from "../features/Login/auth-reducer";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  authData: authReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

type ActionsType = TasksReducerActionTypes | TodolistsReducerActionsType;

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type StoreType = Store<AppRootStateType, ActionsType>;

// @ts-ignore
window.store = store;
