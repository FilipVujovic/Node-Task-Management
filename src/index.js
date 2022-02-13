const express = require("express");
//This makes sure that mongoose.js file runs whenever we start the server, thus connecting to the db
require("./db/mongoose");
const userRouter = require('./routers/userRouter');
const taskRouter = require('./routers/taskRouter');

const app = express();
const port = process.env.PORT;


app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
 
app.listen(port, () => {
  console.log("Server started on port " + port);
});
