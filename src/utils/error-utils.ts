import {
  setAppError,
  SetAppErrorType,
  setAppStatus,
  SetAppStatusType,
} from "../app/app-reducer";

import { Dispatch } from "redux";
import { ResponseType } from "../api/todolists-api";

export const handleServerAppError = <T>(
  data: ResponseType<T>,
  dispatch: Dispatch<ErrorUtilsDispatchType>
) => {
  if (data.messages.length) {
    dispatch(setAppError(data.messages[0]));
  } else {
    dispatch(setAppError("Some error occurred"));
  }
  dispatch(setAppStatus("failed"));
};

export const handleServerNetworkError = (
  error: string,
  dispatch: Dispatch<ErrorUtilsDispatchType>
) => {
  dispatch(setAppStatus("failed"));
  dispatch(setAppError(error ? error : "Some error occurred"));
};

//Types
type ErrorUtilsDispatchType = SetAppErrorType | SetAppStatusType;
