import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios"; // Import Axios for making HTTP requests
import "./GeneratedForm.css";

const GeneratedForm = () => {
  const { id } = useParams();
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const [formData, setFormData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailEndpoint =
      "https://web-form-generator-backend.onrender.com/send-email";

    try {
      await axios.post(emailEndpoint, {
        to: user.email,
        subject: "Form Submission",
        body: "Thank you for submitting the form!",
      });

      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Error submitting the form. Please try again.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://web-form-generator-backend.onrender.com/forms/${id}`
        );
        const responseData = await response.json();
        console.log(responseData);
        setFormData(responseData.formStructure || []);
      } catch (error) {
        console.error("Error fetching form data:", error);
        setFormData([]);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="generatedFormContainer">
      {isAuthenticated ? (
        <>
          <form onSubmit={handleSubmit}>
            <div className="registration-form-title">
              <div className="title">
                <h1>Registration Form</h1>
                <span>Fill out the form carefully for registration</span>
              </div>
            </div>
            {formData.map((data, index) => (
              <div key={index}>
                <span>{data.value}</span>
                <input type="text" required />
              </div>
            ))}
            <button className="standard-button" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </>
      ) : (
        <p>
          Please{" "}
          <button
            className="standard-button"
            onClick={() =>
              loginWithRedirect({
                screen_hint: "form",
                appState: {
                  returnTo: window.location.pathname,
                },
              })
            }
          >
            log in
          </button>{" "}
          to access the form.
        </p>
      )}
    </div>
  );
};

export default GeneratedForm;
