import { TasksStateType } from "../App";
import {
  TaskType,
  todolistsAPI,
  UpdateTaskModelType,
} from "../api/todolists-api";
import { ThunkAction } from "redux-thunk";
import { AppRootStateType } from "./store";
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  SetTodolistsActionType,
} from "./todolists-reducer";

export type AddTaskActionType = {
  type: "ADD-TASK";
  task: TaskType;
};

type RemoveTaskActionType = ReturnType<typeof tasksAC.removeTask>;
type UpdateTaskActionType = ReturnType<typeof tasksAC.updateTask>;
type SetTasksActionType = ReturnType<typeof tasksAC.setTasks>;
type TasksReducerThunkType = ThunkAction<
  void,
  AppRootStateType,
  any,
  TasksReducerActionTypes
>;

type TasksReducerActionTypes =
  | RemoveTaskActionType
  | AddTaskActionType
  | UpdateTaskActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | SetTasksActionType;

type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: number;
  priority?: number;
  startDate?: string;
  deadline?: string;
};

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

export const tasksAC = {
  addTask: (task: TaskType): AddTaskActionType => ({
    type: "ADD-TASK",
    task,
  }),

  removeTask: (taskId: string, todolistId: string) =>
    ({
      type: "REMOVE-TASK",
      taskId,
      todolistId,
    } as const),

  updateTask: (
    taskId: string,
    model: UpdateDomainTaskModelType,
    todolistId: string
  ) => ({ type: "UPDATE-TASK", model, todolistId, taskId } as const),

  changeTaskTitle: (taskId: string, title: string, todolistId: string) =>
    ({ type: "CHANGE-TASK-TITLE", title, todolistId, taskId } as const),

  setTasks: (tasks: TaskType[], todolistId: string) =>
    ({
      type: "SET-TASKS",
      tasks,
      todolistId,
    } as const),
};

export const tasksTC = {
  getTasks:
    (todolistId: string): TasksReducerThunkType =>
    (dispatch) => {
      todolistsAPI
        .getTasks(todolistId)
        .then((res) => dispatch(tasksAC.setTasks(res.data.items, todolistId)));
    },

  removeTask:
    (todolistId: string, taskId: string): TasksReducerThunkType =>
    (dispatch) => {
      todolistsAPI.deleteTask(todolistId, taskId).then((res) => {
        res.data.resultCode === 0 &&
          dispatch(tasksAC.removeTask(taskId, todolistId));
      });
    },

  addTask:
    (todolistId: string, title: string): TasksReducerThunkType =>
    (dispatch) => {
      todolistsAPI.createTask(todolistId, title).then((res) => {
        res.data.resultCode === 0 &&
          dispatch(tasksAC.addTask(res.data.data.item));
      });
    },
  updateTask:
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

        todolistsAPI
          .updateTask(todolistId, taskId, updatedModel)
          .then((res) => {
            res.data.resultCode === 0 &&
              dispatch(tasksAC.updateTask(taskId, updatedModel, todolistId));
          });
      }
    },
};
