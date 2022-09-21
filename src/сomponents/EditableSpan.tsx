import React, { ChangeEvent, useState } from "react";

type PropsType = {
  title: string;
  callBack: (currentTitle: string) => void;
};

export const EditableSpan = (props: PropsType) => {
  const [edit, setEdit] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(props.title);

  const changeEdit = () => {
    setEdit(!edit);
  };

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.currentTarget.value);
    changeTask();
  };
  const changeTask = () => {
    props.callBack(currentTitle.trim());
  };

  return edit ? (
    <input
      type="text"
      value={currentTitle}
      onBlur={changeEdit}
      onChange={onChangeInputHandler}
      autoFocus
    />
  ) : (
    <span onDoubleClick={changeEdit}>{props.title}</span>
  );
};
