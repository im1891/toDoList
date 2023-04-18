import {
  appReducer,
  AppReducerStateType,
  setAppError,
  setAppStatus,
} from "./app-reducer";

let startState: AppReducerStateType;

beforeEach(() => {
  startState = {
    status: "idle",
    error: null,
    isInitialized: false,
  };
});

test("error message should be set", () => {
  const endState = appReducer(startState, setAppError("Some error"));

  expect(endState.error).toBe("Some error");
});

test("error status should be set", () => {
  const endState = appReducer(startState, setAppStatus("loading"));

  expect(endState.status).toBe("loading");
});
