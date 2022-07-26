const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

const db = require("./models");

app.get('/', (request , response) => response.status(200).send('hello world'));

const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

const authRouter = require("./routes/Users");
app.use("/Auth", authRouter);

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3001, () => {
    console.log("Server running");
  });
}).catch((err)=>{
    console.log(err);
});
