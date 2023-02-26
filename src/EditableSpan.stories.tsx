import React from "react";
import { EditableSpan } from "./EditableSpan";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { action } from "@storybook/addon-actions";

export default {
  title: "TODOLIST/EditableSpan",
  component: EditableSpan,
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => (
  <EditableSpan {...args} />
);

export const EditableSpanStory = Template.bind({});

EditableSpanStory.args = {
  onChange: action("Value changed"),
  value: "Start value",
};
