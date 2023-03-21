import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "api-key": "3487aee4-492d-4a9a-a134-8a733f9d2523",
  },
});

//API
export const todolistsAPI = {
  getTodolists() {
    return axiosInstance.get<TodolistType[]>("todo-lists");
  },

  createTodolist(todolistTitle: string) {
    return axiosInstance.post<ResponseType<{ item: TodolistType }>>(
      "/todo-lists",
      {
        title: todolistTitle,
      }
    );
  },

  deleteTodolist(todolistId: string) {
    return axiosInstance
      .delete<ResponseType>(`/todo-lists/${todolistId}`)
      .then((res) => res.data);
  },

  updateTodolistTitle(todolistId: string, newTitle: string) {
    return axiosInstance.put<ResponseType>(`todo-lists/${todolistId}`, {
      title: newTitle,
    });
  },

  getTasks(todolistId: string) {
    return axiosInstance.get<GetTasksResponseType>(
      `todo-lists/${todolistId}/tasks`
    );
  },

  deleteTask(todolistId: string, taskId: string) {
    return axiosInstance.delete<ResponseType>(
      `/todo-lists/${todolistId}/tasks/${taskId}`
    );
  },

  createTask(todolistId: string, title: string) {
    return axiosInstance.post<ResponseType<{ item: TaskType }>>(
      `/todo-lists/${todolistId}/tasks`,
      {
        title,
      }
    );
  },

  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return axiosInstance.put<ResponseType<{ item: TaskType }>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      model
    );
  },
};

//Types
export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

type ResponseType<T = {}> = {
  resultCode: number;
  messages: string[];
  data: T;
};

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export type TaskType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

type GetTasksResponseType = {
  items: TaskType[];
  totalCount: number;
  error: string | null;
};

export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};
