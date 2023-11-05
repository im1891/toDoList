import {
	RequestStatusType,
	setAppErrorAC,
	SetAppErrorActionType,
	setAppStatusAC,
	SetAppStatusActionType
} from '../App/app-reducer'
import { AxiosErrorType, ResponseType } from '../todolists-api'
import { Dispatch } from 'redux'

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
	if (data.messages.length > 0) {
		dispatch(setAppErrorAC(data.messages[0]))
	} else {
		dispatch(setAppErrorAC('Some error occurred'))
	}
	dispatch(setAppStatusAC(RequestStatusType.FAILED))
}

export const handleServerNetworkError = (e: AxiosErrorType, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
	dispatch(setAppErrorAC(e.response ? e.response.data.message : e.message ? e.message : 'Some error occurred'))
	dispatch(setAppStatusAC(RequestStatusType.FAILED))
}