import React, { useReducer } from "react";
import "./App.css";
import { v1 } from "uuid";
import { AddItemForm } from "./components/AddItemForm";
import { TodoList } from "./components/TodoList/TodoList";
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu } from "@material-ui/icons";
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
  todoListsReducer,
} from "./reducers/todoLists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./reducers/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TasksStateType = {
  [key: string]: TaskType[];
};

export function AppUseReducers() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todoLists, dispatchToTodoListsReducer] = useReducer(todoListsReducer, [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);

  let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
    [todolistId1]: [
      { id: v1(), title: "HTML", isDone: false },
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "JS", isDone: true },
    ],
    [todolistId2]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Bread", isDone: false },
      { id: v1(), title: "Book", isDone: false },
      { id: v1(), title: "Meat", isDone: false },
    ],
  });

  const addTodoList = (newTodoListTitle: string) => {
    let action = addTodoListAC(newTodoListTitle);
    dispatchToTodoListsReducer(action);
    dispatchToTasksReducer(action);
  };

  const removeTodoLIst = (todoListId: string) => {
    let action = removeTodoListAC(todoListId);
    dispatchToTodoListsReducer(action);
    dispatchToTasksReducer(action);
  };

  const changeTodoListTitle = (todoListId: string, newTitle: string) => {
    dispatchToTodoListsReducer(changeTodoListTitleAC(todoListId, newTitle));
  };

  const changeTodoListFilter = (
    todoListId: string,
    filterValue: FilterValuesType
  ) => {
    dispatchToTodoListsReducer(changeTodoListFilterAC(todoListId, filterValue));
  };

  const addTask = (todolistId: string, taskTitle: string) => {
    dispatchToTasksReducer(addTaskAC(todolistId, taskTitle));
  };

  const removeTask = (todoListId: string, taskId: string) => {
    dispatchToTasksReducer(removeTaskAC(todoListId, taskId));
  };

  const changeTaskStatus = (
    todoListId: string,
    taskId: string,
    newIsDone: boolean
  ) => {
    dispatchToTasksReducer(changeTaskStatusAC(todoListId, taskId, newIsDone));
  };

  const changeTaskTitle = (
    todoListId: string,
    taskId: string,
    newTaskTitle: string
  ) => {
    dispatchToTasksReducer(changeTaskTitleAC(todoListId, taskId, newTaskTitle));
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6">Todolist</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm callBack={addTodoList} />
        </Grid>
        <Grid container spacing={3}>
          {todoLists.map((td) => {
            let taskForTodoList = tasks[td.id];

            if (td.filter === "active") {
              taskForTodoList = tasks[td.id].filter((ts) => !ts.isDone);
            }
            if (td.filter === "completed") {
              taskForTodoList = tasks[td.id].filter((ts) => ts.isDone);
            }
            return (
              <Grid item>
                <Paper style={{ padding: "10px" }}>
                  <TodoList
                    todoListId={td.id}
                    title={td.title}
                    filter={td.filter}
                    tasks={taskForTodoList}
                    changeTodoListFilter={changeTodoListFilter}
                    changeTaskStatus={changeTaskStatus}
                    removeTask={removeTask}
                    addTask={addTask}
                    removeTodoList={removeTodoLIst}
                    changeTaskTitle={changeTaskTitle}
                    changeTodoListTitle={changeTodoListTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}
