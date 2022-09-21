import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type SuperInputType = {
  callBack: (newTitle: string) => void;
};

export const SuperInput = (props: SuperInputType) => {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const addTask = () => {
    if (title.trim() !== "") {
      props.callBack(title.trim());
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      addTask();
    }
  };

  return (
    <div>
      <input
        value={title}
        onChange={onChangeInputHandler}
        onKeyPress={onKeyPressHandler}
        className={error ? "error" : ""}
      />
      <button onClick={addTask}>+</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};
