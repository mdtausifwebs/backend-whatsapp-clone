const express = require("express");
const app = express();
require("dotenv").config({ path: "./database/.env" });
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const data = require("./database/db");
const port = process.env.PORT || 4500;

const userRoute = require("./src/Router/UserRoute");
const conversationRoute = require("./src/Router/ConversationRoute");
app.use("/api/v1", userRoute);
app.use("/api/v1", conversationRoute);

app.listen(port, () => {
  data();
  console.log(`server is working http://localhost:${port}`);
});
