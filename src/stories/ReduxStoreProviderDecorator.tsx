import React from "react";
import { Provider } from "react-redux";
import { v1 } from "uuid";
import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import { todolistsReducer } from "../features/TodolistList/Todolist/todolists-reducer";
import { tasksReducer } from "../features/TodolistList/Todolist/tasks-reducer";
import { TaskPriorities, TaskStatuses } from "../api/todolists-api";
import { AppRootStateType } from "../app/store";
import { appReducer } from "../app/app-reducer";
import thunk from "redux-thunk";

const initialGlobalState: AppRootStateType = {
  todolists: [
    {
      id: "todolistId1",
      title: "What to learn",
      filter: "all",
      addedDate: "",
      order: 0,
      entityStatus: "idle",
    },
    {
      id: "todolistId2",
      title: "What to buy",
      filter: "all",
      addedDate: "",
      order: 0,
      entityStatus: "loading",
    },
  ],

  tasks: {
    ["todolistId1"]: [
      {
        id: v1(),
        title: "HTML&CSS",
        status: TaskStatuses.Completed,
        description: "",
        order: 0,
        deadline: "",
        priority: TaskPriorities.Low,
        addedDate: "",
        startDate: "",
        todoListId: "todolistId1",
        entityStatus: "idle",
      },
      {
        id: v1(),
        title: "JS",
        status: TaskStatuses.New,
        description: "",
        order: 0,
        deadline: "",
        priority: TaskPriorities.Low,
        addedDate: "",
        startDate: "",
        todoListId: "todolistId1",
        entityStatus: "idle",
      },
    ],
    ["todolistId2"]: [
      {
        id: v1(),
        title: "Milk",
        status: TaskStatuses.Completed,
        description: "",
        order: 0,
        deadline: "",
        priority: TaskPriorities.Low,
        addedDate: "",
        startDate: "",
        todoListId: "todolistId2",
        entityStatus: "idle",
      },
      {
        id: v1(),
        title: "React Book",
        status: TaskStatuses.New,
        description: "",
        order: 0,
        deadline: "",
        priority: TaskPriorities.Low,
        addedDate: "",
        startDate: "",
        todoListId: "todolistId2",
        entityStatus: "idle",
      },
    ],
  },
  app: {
    status: "idle",
    error: null,
    isInitialized: false,
  },
  authData: {
    isLoggedIn: false,
  },
};

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
});

const storyBookStore = createStore(
  rootReducer,
  initialGlobalState,
  applyMiddleware(thunk)
);

export const ReduxStoreProviderDecorator = (Story: () => JSX.Element) => {
  return (
    <Provider store={storyBookStore}>
      <Story />
    </Provider>
  );
};
