const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { generateResponse, history, generateChatResonse } = require("./controllers/index.js");

dotenv.config();

const app = express();
const port = process.env.PORT;

//middleware to parse the body content to JSON
app.use(bodyParser.json());

app.post("/generate", generateResponse);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/generate", (req, res) => {
    res.send(history);
  });

app.post("/chat", generateChatResonse);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});