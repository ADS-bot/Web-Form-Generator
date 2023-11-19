import React, { createContext, useContext, useState } from "react";

const FormContext = createContext();

export function useFormContext() {
  return useContext(FormContext);
}

export default function FormProvider(props) {
  const [addFields, setAddFields] = useState([
    {
      id: 0,
      value: "",
    },
  ]);

  const [formURL, setFormURL] = useState("");
  const [fieldName, setFieldName] = useState([{ value: "" }]);
  const [isLogin, setIsLogin] = useState(false);
  return (
    <FormContext.Provider
      value={{
        addFields,
        setAddFields,
        fieldName,
        setFieldName,
        formURL,
        setFormURL,
        isLogin,
        setIsLogin,
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
}
