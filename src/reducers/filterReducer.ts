import {FilterValuesType} from "../App";

export const filterReducer = (state: FilterValuesType, action: changeFilterACType) => {
    switch (action.type) {
        case 'CHANGE-FILTER': {
            return action.payload.value
        }
    }
}
type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (value: FilterValuesType) => (
    {
        type: 'CHANGE-FILTER',
        payload: {
            value
        }
    } as const
)
