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

const initialGlobalState = {
  todolists: [
    { id: "todolistId1", title: "What to learn", filter: "all" },
    { id: "todolistId2", title: "What to buy", filter: "all" },
  ],

  tasks: {
    ["todolistId1"]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: false },
    ],
    ["todolistId2"]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "React Book", isDone: false },
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
  initialGlobalState as AppRootStateType
);

export const ReduxStoreProviderDecorator = (Story: () => JSX.Element) => {
  return (
    <Provider store={storyBookStore}>
      <Story />
    </Provider>
  );
};
