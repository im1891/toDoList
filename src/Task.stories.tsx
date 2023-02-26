import React from "react";
import { Task } from "./Task";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ReduxStoreProviderDecorator } from "./stories/ReduxStoreProviderDecorator";

export default {
  title: "TODOLIST/Task",
  component: Task,
  args: {
    changeTaskTitle: action("Title changed"),
    changeTaskStatus: action("Status changed"),
    removeTask: action("Task removed"),
    task: { id: "1", isDone: true, title: "CSS" },
  },
  decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});

export const TaskIsNotDoneStory = Template.bind({});

TaskIsNotDoneStory.args = {
  task: { id: "2", isDone: false, title: "JS" },
};
