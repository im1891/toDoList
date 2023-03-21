import { AppRootStateType } from "../app/store";
import { AnyAction } from "redux";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

export type ThunkDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>;

export const useAppDispatch = () => useDispatch<ThunkDispatchType>();
