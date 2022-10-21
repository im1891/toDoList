import { v1 } from "uuid";
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
  todoListsReducer,
} from "../todoLists-reducer";
import { FilterValuesType, TodoListType } from "../../App";

let todolistId1: string;
let todolistId2: string;

let newTodolistTitle: string;

let startState: Array<TodoListType>;

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();

  newTodolistTitle = "New Todolist";

  startState = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];
});

test("correct todolist should be removed", () => {
  const endState = todoListsReducer(startState, removeTodoListAC(todolistId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
  const endState = todoListsReducer(
    startState,
    addTodoListAC(newTodolistTitle)
  );

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodolistTitle);
  expect(endState[0].filter).toBe("all");
  expect(endState[0].id).toBeDefined();
});

test("correct todolist should change its name", () => {
  const endState = todoListsReducer(
    startState,
    changeTodoListTitleAC(todolistId2, newTodolistTitle)
  );

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
  let newFilter: FilterValuesType = "completed";

  const endState = todoListsReducer(
    startState,
    changeTodoListFilterAC(todolistId2, newFilter)
  );

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});
