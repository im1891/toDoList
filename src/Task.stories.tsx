import React from "react";
import { Task } from "./Task";

import { ReduxStoreProviderDecorator } from "./stories/ReduxStoreProviderDecorator";
import { TaskPriorities, TaskStatuses } from "./api/todolists-api";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { action } from "@storybook/addon-actions";

export default {
  title: "TODOLIST/Task",
  component: Task,
  args: {
    changeTaskTitle: action("Title changed"),
    changeTaskStatus: action("Status changed"),
    removeTask: action("Task removed"),
    task: {
      id: "1",
      title: "CSS",
      status: TaskStatuses.Completed,
      description: "",
      todoListId: "todolistId",
      startDate: "",
      priority: TaskPriorities.Low,
      order: 0,
      deadline: "",
      addedDate: "",
    },
  },
  decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});

export const TaskIsNotDoneStory = Template.bind({});

TaskIsNotDoneStory.args = {
  task: {
    id: "2",
    title: "JS",
    status: TaskStatuses.New,
    description: "",
    todoListId: "todolistId",
    startDate: "",
    priority: TaskPriorities.Low,
    order: 0,
    deadline: "",
    addedDate: "",
  },
};
