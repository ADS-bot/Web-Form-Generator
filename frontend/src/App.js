import React from "react";
import FormGenerator from "./Components/FormGenerator";
import GeneratedForm from "./Components/GeneratedForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FormContext from "./Components/FormContext";
import NavBar from "./Components/NavBar";

const App = () => {
  return (
    <FormContext>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavBar />
                <FormGenerator />
              </>
            }
          />
          <Route path="/forms/:id" element={<GeneratedForm />} />
        </Routes>
      </BrowserRouter>
    </FormContext>
  );
};

export default App;
