import React from "react";
import "./FormGenerator.css";
import { AiFillDelete } from "react-icons/ai";
import EditableInput from "./EditableInput";
import { useFormContext } from "./FormContext";
import axios from "axios";
const FormGenerator = () => {
  const { addFields, setAddFields, formURL, setFormURL } = useFormContext();

  const addFieldEventHandler = (event) => {
    event.preventDefault();
    let n = addFields.length;
    const newField = {
      id: n,
      value: "Click Here to Edit Field",
    };
    const newArray = [...addFields, newField];
    setAddFields(newArray);
  };

  const deleteEventHandler = (event, index) => {
    event.preventDefault();
    const updatedFields = addFields.filter((_, i) => i !== index);
    setAddFields(updatedFields);
  };

  const generateFormURL = async () => {
    try {
      const response = await axios.post(
        "https://web-form-generator-backend.onrender.com/forms/generate",
        {
          formStructure: addFields,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = response.data;
      setFormURL(responseData.uniqueIdentifier);
    } catch (error) {
      console.error("Error sending data to the backend:", error);
    }
  };
  return (
    <div className="whole-form">
      <div className="registration-form">
        <form className="whole-registration-form">
          <div className="registration-form-title">
            <div className="title">
              <h1>Registration Form</h1>
              <span>Fill out the form carefully for registration</span>
            </div>
          </div>

          <div className="all-added-fields">
            {addFields.map((data, index) => {
              return (
                <div className="added-field-box" key={data.id}>
                  <div className="field-box">
                    <div className="icons-container">
                      <EditableInput
                        index={index}
                        value="Click Here to Edit Field"
                      />
                      <button
                        onClick={(event) => {
                          deleteEventHandler(event, index);
                        }}
                        className="delete-button"
                      >
                        <AiFillDelete className="delete-icon" />
                      </button>
                    </div>
                    <input></input>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <button className="standard-button" onClick={addFieldEventHandler}>
              Add Fields
            </button>
          </div>
          <button
            className="url-generator standard-button"
            type="button"
            onClick={generateFormURL}
          >
            Generate Form URL
          </button>
        </form>
        {formURL && (
          <div>
            <p>Your form URL:</p>
            <a
              href={`/forms/${formURL}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {`https://web-form-generator.vercel.app/forms/${formURL}`}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormGenerator;
