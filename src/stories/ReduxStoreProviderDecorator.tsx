import React from "react";
import { Provider } from "react-redux";
import { v1 } from "uuid";
import {
  combineReducers,
  legacy_createStore as createStore,
  Store,
} from "redux";
import { todolistsReducer } from "../state/todolists-reducer";
import { tasksReducer } from "../state/tasks-reducer";
import { TaskPriorities, TaskStatuses } from "../api/todolists-api";

const initialGlobalState: AppRootStateType = {
  todolists: [
    {
      id: "todolistId1",
      title: "What to learn",
      filter: "all",
      addedDate: "",
      order: 0,
    },
    {
      id: "todolistId2",
      title: "What to buy",
      filter: "all",
      addedDate: "",
      order: 0,
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
      },
    ],
  },
};

type AppRootStateType = ReturnType<typeof rootReducer>;
type StoryBookStoreType = Store<AppRootStateType>;

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
});

const storyBookStore: StoryBookStoreType = createStore(
  rootReducer,
  initialGlobalState
);

export const ReduxStoreProviderDecorator = (Story: () => JSX.Element) => {
  return (
    <Provider store={storyBookStore}>
      <Story />
    </Provider>
  );
};
