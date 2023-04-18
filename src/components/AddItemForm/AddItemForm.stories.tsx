import { AddItemForm } from "./AddItemForm";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import TextField from "@mui/material/TextField/TextField";
import { IconButton } from "@mui/material";
import { AddBox } from "@mui/icons-material";

export default {
  title: "TODOLIST/AddItemForm",
  component: AddItemForm,
  argTypes: {
    addItem: {
      description: "Button clicked inside form",
    },
  },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => (
  <AddItemForm {...args} />
);

const TemplateWithError: ComponentStory<typeof AddItemForm> = (args) => {
  let [title, setTitle] = useState("");
  let [error, setAppError] = useState<string | null>("Title is required");

  const addItem = () => {
    if (title.trim() !== "") {
      args.addItem(title);
      setTitle("");
    } else {
      setAppError("Title is required");
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    error && setAppError(null);
    if (e.charCode === 13) {
      addItem();
    }
  };

  return (
    <div>
      <TextField
        variant="outlined"
        error={!!error}
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyPressHandler}
        label="Title"
        helperText={error}
      />
      <IconButton color="primary" onClick={addItem}>
        <AddBox />
      </IconButton>
    </div>
  );
};

export const AddItemFormStory = Template.bind({});

AddItemFormStory.args = {
  addItem: action("Button 'add' was pressed inside the form"),
};

export const AddItemFormStoryWithError = TemplateWithError.bind({});

AddItemFormStoryWithError.args = {
  addItem: action("Button 'add' was pressed inside the form"),
};

export const AddItemFormDisabled = Template.bind({});

AddItemFormDisabled.args = {
  disabled: true,
};
