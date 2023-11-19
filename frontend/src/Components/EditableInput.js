// EditableInput.js
import React, { useRef, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { useFormContext } from "./FormContext";
import "./EditableInput.css";

const EditableInput = ({ value: initialValue, index }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef();
  const { setAddFields } = useFormContext();

  const editableEventHandler = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    } else {
      setIsEditable(true);
      setValue("");
      inputRef.current.focus();
    }
  };

  const changeHandler = (event) => {
    setValue(event.target.value);
    setAddFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[index] = {
        ...updatedFields[index],
        value: event.target.value,
      };
      return updatedFields;
    });
  };

  const pageReloadingHandler = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  };

  return (
    <div>
      <span className="change-input">
        <input
          ref={inputRef}
          value={value}
          readOnly={!isEditable}
          onClick={editableEventHandler}
          onBlur={() => {
            setIsEditable(false);
          }}
          onChange={changeHandler}
          onKeyDown={pageReloadingHandler}
        />
        <MdModeEditOutline
          className="editable-icon"
          onClick={editableEventHandler}
        />
      </span>
    </div>
  );
};

export default EditableInput;
