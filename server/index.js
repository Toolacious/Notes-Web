require("dotenv-defaults").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
// import Router
const authRouter = require("./routes/auth");
const notesRouter = require("./routes/notes");
const cors = require("cors");

// connect DB
mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Connect to DB")
);

// middleware body parser
app.use(cors());
app.use(express.json());
app.use("/api/user", authRouter);
app.use("/api/notes", notesRouter);

app.listen(4000, () => console.log("server is up on port 4000"));
