import {
  TaskType,
  todolistsAPI,
  UpdateTaskModelType,
} from "../../../api/todolists-api";
import { ThunkAction } from "redux-thunk";
import { AppRootStateType } from "../../../app/store";
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  SetTodolistsActionType,
} from "./todolists-reducer";

const initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: TasksReducerActionTypes
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(
          (t) => t.id !== action.taskId
        ),
      };
    }
    case "ADD-TASK": {
      return {
        ...state,
        [action.task.todoListId]: [
          action.task,
          ...state[action.task.todoListId],
        ],
      };
    }
    case "UPDATE-TASK": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.taskId
            ? {
                ...t,
                ...action.model,
              }
            : t
        ),
      };
    }
    case "ADD-TODOLIST": {
      return {
        ...state,
        [action.todolist.id]: [],
      };
    }
    case "REMOVE-TODOLIST": {
      const {
        [action.todolistId]: [],
        ...restKeys
      } = { ...state };
      return restKeys;

      // ---------------------------OR---------------------------
      /*   const copyState = { ...state };
                                                                                                                                                                                                                                                     delete copyState[action.id];
                                                                                                                                                                                                                                                     return copyState;*/
    }
    case "SET-TODOLISTS": {
      let stateCopy = { ...state };
      action.todolists.forEach((td) => (stateCopy[td.id] = []));
      return stateCopy;
    }

    case "SET-TASKS": {
      return { ...state, [action.todolistId]: action.tasks };
    }
    default:
      return state;
  }
};

//Actions/////////////////////////////////////////////////////////////////////
export const addTaskAC = (task: TaskType) =>
  ({
    type: "ADD-TASK",
    task,
  } as const);

export const removeTaskAC = (taskId: string, todolistId: string) =>
  ({
    type: "REMOVE-TASK",
    taskId,
    todolistId,
  } as const);

export const updateTaskAC = (
  taskId: string,
  model: UpdateDomainTaskModelType,
  todolistId: string
) => ({ type: "UPDATE-TASK", model, todolistId, taskId } as const);

export const setTasksAC = (tasks: TaskType[], todolistId: string) =>
  ({
    type: "SET-TASKS",
    tasks,
    todolistId,
  } as const);

//Thunks/////////////////////////////////////////////////////////////////////
export const getTasksTC =
  (todolistId: string): TasksReducerThunkType =>
  (dispatch) => {
    todolistsAPI
      .getTasks(todolistId)
      .then((res) => dispatch(setTasksAC(res.data.items, todolistId)));
  };

export const removeTaskTC =
  (todolistId: string, taskId: string): TasksReducerThunkType =>
  (dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId).then((res) => {
      res.data.resultCode === 0 && dispatch(removeTaskAC(taskId, todolistId));
    });
  };

export const addTaskTC =
  (todolistId: string, title: string): TasksReducerThunkType =>
  (dispatch) => {
    todolistsAPI.createTask(todolistId, title).then((res) => {
      res.data.resultCode === 0 && dispatch(addTaskAC(res.data.data.item));
    });
  };
export const updateTaskTC =
  (
    todolistId: string,
    taskId: string,
    domainModel: UpdateDomainTaskModelType
  ): TasksReducerThunkType =>
  (dispatch, getState) => {
    const task = getState().tasks[todolistId].find((ts) => ts.id === taskId);
    if (task) {
      const updatedModel: UpdateTaskModelType = {
        title: task.title,
        status: task.status,
        description: task.description,
        startDate: task.startDate,
        priority: task.priority,
        deadline: task.deadline,
        ...domainModel,
      };

      todolistsAPI.updateTask(todolistId, taskId, updatedModel).then((res) => {
        res.data.resultCode === 0 &&
          dispatch(updateTaskAC(taskId, updatedModel, todolistId));
      });
    }
  };

//Types
type TasksReducerThunkType = ThunkAction<
  void,
  AppRootStateType,
  any,
  TasksReducerActionTypes
>;

type TasksReducerActionTypes =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof addTaskAC>
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | AddTodolistActionType;

type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: number;
  priority?: number;
  startDate?: string;
  deadline?: string;
};

export type TasksStateType = {
  [key: string]: TaskType[];
};
