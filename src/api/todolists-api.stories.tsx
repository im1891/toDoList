import React, { useEffect, useState } from "react";
import { todolistsAPI, UpdateTaskType } from "./todolists-api";

export default {
  title: "API",
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    todolistsAPI.getTodolists().then((response) => {
      setState(response.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [todolistTitle, setTodolistTitle] = useState<string>("");

  const addNewTodolist = (todolistTitle: string) => {
    todolistsAPI.createTodolist(todolistTitle).then((response) => {
      setState(response.data.data);
      setTodolistTitle("");
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <input
        type="text"
        placeholder="Enter todolist title"
        onChange={(e) => setTodolistTitle(e.currentTarget.value)}
        value={todolistTitle}
      />
      <button onClick={() => addNewTodolist(todolistTitle)}>
        Add todolist
      </button>
    </div>
  );
};
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");

  const deleteTodolist = () => {
    todolistsAPI.deleteTodolist(todolistId).then((res) => setState(res.data));
    setTodolistId("");
  };

  return (
    <div>
      {JSON.stringify(state)}
      <input
        type="text"
        placeholder={"Enter todolistId"}
        value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}
      />
      <button onClick={deleteTodolist}>del</button>
    </div>
  );
};
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const [todolistId, setTodolistId] = useState<string>("");

  const updateTitle = (todolistId: string, newTitle: string) => {
    todolistsAPI.updateTodolistTitle(todolistId, newTitle).then((res) => {
      setState(res.data);
    });
    setTodolistId("");
    setNewTitle("");
  };
  return (
    <div>
      {JSON.stringify(state)}
      <input
        type="text"
        placeholder={"Enter todolist id"}
        value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}
      />
      <input
        type="text"
        placeholder={"Enter new title"}
        value={newTitle}
        onChange={(e) => setNewTitle(e.currentTarget.value)}
      />
      <button onClick={() => updateTitle(todolistId, newTitle)}>
        Update title
      </button>
    </div>
  );
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");

  const getTasks = (todolistId: string) => {
    todolistsAPI.getTasks(todolistId).then((response) => {
      setState(response.data.items);
      setTodolistId("");
    });
  };
  return (
    <div>
      {JSON.stringify(state)}
      <input
        type="text"
        placeholder={"Enter todolist id"}
        value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}
      />
      <button onClick={() => getTasks(todolistId)}>Get tasks</button>
    </div>
  );
};

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");
  const [taskId, setTaskId] = useState<string>("");

  const deleteTask = (todolistId: string, taskId: string) => {
    todolistsAPI.deleteTask(todolistId, taskId).then((response) => {
      setState(response.data);
      setTaskId("");
      setTodolistId("");
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <input
        type="text"
        placeholder={"Enter todolist id"}
        value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}
      />
      <input
        type="text"
        placeholder={"Enter task id"}
        value={taskId}
        onChange={(e) => setTaskId(e.currentTarget.value)}
      />
      <button onClick={() => deleteTask(todolistId, taskId)}>
        Delete task
      </button>
    </div>
  );
};

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");
  const [taskTitle, setTaskTitle] = useState<string>("");

  const createTask = (todolistId: string, taskTitle: string) => {
    todolistsAPI.createTask(todolistId, taskTitle).then((response) => {
      setState(response.data);
    });
    setTodolistId("");
    setTaskTitle("");
  };

  return (
    <div>
      {JSON.stringify(state)}
      <input
        type="text"
        placeholder="Enter todolist id"
        onChange={(e) => setTodolistId(e.currentTarget.value)}
        value={todolistId}
      />
      <input
        type="text"
        placeholder="Enter task title"
        onChange={(e) => setTaskTitle(e.currentTarget.value)}
        value={taskTitle}
      />

      <button onClick={() => createTask(todolistId, taskTitle)}>
        Add task
      </button>
    </div>
  );
};

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");
  const [taskId, setTaskId] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<number>(0);
  const [priority, setPriority] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const updateTask = (
    todolistId: string,
    taskId: string,
    title: string,
    startDate: string,
    deadline: string,
    priority: number,
    description: string,
    status: number
  ) => {
    const updatedTask: UpdateTaskType = {
      title: title,
      deadline: deadline,
      description: description,
      priority: priority,
      status: status,
      startDate: startDate,
    };

    todolistsAPI
      .updateTask(todolistId, taskId, updatedTask)
      .then((response) => {
        setState(response.data);
      });

    setStartDate("");
    setPriority(0);
    setStatus(0);
    setTaskId("");
    setDescription("");
    setTodolistId("");

    setDeadline("");
    setTitle("");
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type="text"
          placeholder="Enter todolist id"
          onChange={(e) => setTodolistId(e.currentTarget.value)}
          value={todolistId}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter task id"
          onChange={(e) => setTaskId(e.currentTarget.value)}
          value={taskId}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter description"
          onChange={(e) => setDescription(e.currentTarget.value)}
          value={description}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter status"
          onChange={(e) => setStatus(+e.currentTarget.value)}
          value={status}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter priority"
          onChange={(e) => setPriority(+e.currentTarget.value)}
          value={priority}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter startDate"
          onChange={(e) => setStartDate(e.currentTarget.value)}
          value={startDate}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter deadline"
          onChange={(e) => setDeadline(e.currentTarget.value)}
          value={deadline}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter title"
          onChange={(e) => setTitle(e.currentTarget.value)}
          value={title}
        />
      </div>

      <button
        onClick={() =>
          updateTask(
            todolistId,
            taskId,
            title,
            startDate,
            deadline,
            priority,
            description,
            status
          )
        }
      >
        Update task
      </button>
    </div>
  );
};
