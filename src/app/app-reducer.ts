import { ThunkAction } from "redux-thunk";
import { AppRootStateType } from "./store";
import { authAPI, ResultStatus } from "../api/todolists-api";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../utils/error-utils";
import { AxiosError } from "axios";
import {
  setIsLoggedInAC,
  SetIsLoggedInACType,
} from "../features/Login/auth-reducer";

const initialState: AppReducerStateType = {
  status: "idle",
  error: null,
  isInitialized: false,
};

export const appReducer = (
  state: AppReducerStateType = initialState,
  action: AppReducerActionsType
) => {
  switch (action.type) {
    case "APP/SET-STATUS":
      return { ...state, status: action.payload.status };
    case "APP/SET-ERROR":
      return { ...state, error: action.paylaod.errorMessage };
    case "APP/SET-IS-INITIALIZED": {
      return { ...state, isInitialized: action.value };
    }
    default:
      return state;
  }
};

//Actions
export const setAppError = (error: string | null) =>
  ({
    type: "APP/SET-ERROR",
    paylaod: {
      errorMessage: error,
    },
  } as const);

export const setAppStatus = (status: RequestStatusType) =>
  ({
    type: "APP/SET-STATUS",
    payload: {
      status,
    },
  } as const);

export const setAppInitialized = (value: boolean) =>
  ({
    type: "APP/SET-IS-INITIALIZED",
    value,
  } as const);

//Thunks
export const initializeAppTC = (): AppReducerThunkType => (dispatch) => {
  authAPI
    .me()
    .then((res) => {
      if (res.data.resultCode === ResultStatus.OK) {
        dispatch(setIsLoggedInAC(true));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((e: AxiosError<{ message: string }>) => {
      const error = e.response?.data ? e.response?.data.message : e.message;

      handleServerNetworkError(error, dispatch);
    })
    .finally(() => {
      dispatch(setAppInitialized(true));
    });
};

//Types
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

export type AppReducerStateType = {
  status: RequestStatusType;
  error: string | null;
  isInitialized: boolean;
};

type AppReducerThunkType = ThunkAction<
  void,
  AppRootStateType,
  any,
  AppReducerActionsType
>;
export type SetAppErrorType = ReturnType<typeof setAppError>;
export type SetAppStatusType = ReturnType<typeof setAppStatus>;

type AppReducerActionsType =
  | SetAppErrorType
  | SetAppStatusType
  | SetIsLoggedInACType
  | ReturnType<typeof setAppInitialized>;
