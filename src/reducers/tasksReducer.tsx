import {v1} from "uuid";
import {TaskType} from "../App";


export const tasksReducer = (state: TaskType[], action: tsarType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return state.filter(t => t.id != action.payload.id);
        }
        case 'ADD-TASK': {
            let newTask = {id: v1(), title: action.payload.title, isDone: false};
            return state = [newTask, ...state];
        }
        default:
            return state
    }

}

type tsarType = removeTaskACType | addTaskACType
type removeTaskACType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (id: string) => (
    {
        type: 'REMOVE-TASK',
        payload: {
            id: id
        }
    } as const
)

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string) => (
    {
        type: 'ADD-TASK',
        payload: {
            //title: title
            title
        }
    } as const
)


