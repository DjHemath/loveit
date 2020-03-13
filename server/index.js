const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const userRoute = require("./routes/user.route");

app.use("/user", userRoute);

app.listen(5000, () => console.log("Server is up and running!"));
