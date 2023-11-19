const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const formsData = {};

app.use(cors());
app.use(bodyParser.json());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Endpoint for sending emails
app.post("/send-email", async (req, res) => {
  const { to, subject, body } = req.body;

  const mailOptions = {
    from: "arghadeep.champ@gmail.com",
    to: to,
    subject: subject,
    text: body,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully!");
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error sending email" });
  }
});

app.post("/forms/generate", (req, res) => {
  const uniqueIdentifier = Math.random().toString(36).substring(7);

  const { formStructure } = req.body;

  formsData[uniqueIdentifier] = {
    responses: [],
    formStructure,
  };

  res.json({ uniqueIdentifier });
});

app.get("/forms/:uniqueIdentifier", (req, res) => {
  const uniqueIdentifier = req.params.uniqueIdentifier;
  const formData = formsData[uniqueIdentifier];

  if (formData) {
    console.log("Form Data Sent:", formData);
    res.json({
      uniqueIdentifier,
      responses: formData.responses,
      formStructure: formData.formStructure,
    });
  } else {
    console.error("Form not found. Unique Identifier:", uniqueIdentifier);
    res.status(404).json({ error: "Form not found." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
