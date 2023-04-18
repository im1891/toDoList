import { ThunkAction } from "redux-thunk";
import { AppRootStateType } from "../../app/store";
import { authAPI, LoginDataType, ResultStatus } from "../../api/todolists-api";
import { setAppStatus, SetAppStatusType } from "../../app/app-reducer";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";
import { AxiosError } from "axios";
import {
  clearTodosDataAC,
  clearTodosDataACType,
} from "../TodolistList/Todolist/todolists-reducer";

const initialState: LoginStateType = {
  isLoggedIn: false,
};

export const authReducer = (
  state = initialState,
  action: authReducerActionsType
) => {
  switch (action.type) {
    case "login/SET-IS-LOGGED-IN":
      return { ...state, isLoggedIn: action.value };
    default:
      return state;
  }
};

//Actions
export const setIsLoggedInAC = (value: boolean) =>
  ({
    type: "login/SET-IS-LOGGED-IN",
    value,
  } as const);

//Thunks
export const loginTC =
  (data: LoginDataType): AuthReducerThunkType =>
  (dispatch) => {
    dispatch(setAppStatus("loading"));
    authAPI
      .login(data)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoggedInAC(true));
          dispatch(setAppStatus("succeeded"));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((e: AxiosError<{ message: string }>) => {
        const error = e.response?.data ? e.response.data.message : e.message;
        handleServerNetworkError(error, dispatch);
      });
  };

export const logoutTC = (): AuthReducerThunkType => (dispatch) => {
  dispatch(setAppStatus("loading"));

  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === ResultStatus.OK) {
        dispatch(setIsLoggedInAC(false));
        dispatch(setAppStatus("succeeded"));
        dispatch(clearTodosDataAC());
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((e: AxiosError<{ message: string }>) => {
      const error = e.response?.data ? e.response.data.message : e.message;
      handleServerNetworkError(error, dispatch);
    });
};

//types
type LoginStateType = {
  isLoggedIn: boolean;
};

export type SetIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>;

type authReducerActionsType =
  | SetAppStatusType
  | SetIsLoggedInACType
  | clearTodosDataACType;

type AuthReducerThunkType = ThunkAction<
  void,
  AppRootStateType,
  any,
  authReducerActionsType
>;
