import TextField from "@mui/material/TextField/TextField";
import React, { ChangeEvent, KeyboardEvent, memo, useState } from "react";
import { IconButton } from "@mui/material";
import { AddBox } from "@mui/icons-material";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
  disabled?: boolean;
};

export const AddItemForm: React.FC<AddItemFormPropsType> = memo(
  ({ addItem, disabled = false }) => {
    let [title, setTitle] = useState("");
    let [error, setAppError] = useState<string | null>(null);

    const addItemHandler = () => {
      if (title.trim() !== "") {
        addItem(title);
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
      if (e.key === "Enter") {
        addItemHandler();
      }
    };

    return (
      <div>
        <TextField
          disabled={disabled}
          variant="outlined"
          error={!!error}
          value={title}
          onChange={onChangeHandler}
          onKeyDown={onKeyPressHandler}
          label="Title"
          helperText={error}
        />
        <IconButton
          color="primary"
          onClick={addItemHandler}
          disabled={disabled}
        >
          <AddBox />
        </IconButton>
      </div>
    );
  }
);
