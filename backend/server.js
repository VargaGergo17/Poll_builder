const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let surveys = []; // ide tároljuk ideiglenesen a felméréseket

app.post("/create-survey", (req, res) => {
  const survey = req.body;
  surveys.push(survey);
  res.json({ message: "Survey created successfully!" });
});

app.get("/surveys", (req, res) => {
  res.json(surveys);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
