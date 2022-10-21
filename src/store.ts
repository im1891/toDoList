import {
  combineReducers,
  legacy_createStore as createStore,
  Store,
} from "redux";
import {
  TodoListsActionTypes,
  todoListsReducer,
} from "./reducers/todoLists-reducer";
import { TasksActionTypes, tasksReducer } from "./reducers/tasks-reducer";

type ActionsTypes = TodoListsActionTypes | TasksActionTypes;
export type AppStateType = ReturnType<typeof rootReducer>;
type StoreType = Store<AppStateType, ActionsTypes>;

const rootReducer = combineReducers({
  todoLists: todoListsReducer,
  tasks: tasksReducer,
});

export const store: StoreType = createStore(rootReducer);

// @ts-ignore
window.store = store;
