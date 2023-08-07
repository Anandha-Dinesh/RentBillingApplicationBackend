const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const models = require("./models");

const app = express();
dotenv.config({ path: "config/.env" });

var corOptions = {
  origin: "http://localhost:3001",
  credentials: true,
};

models.sequelize
  .sync()
  .then(function () {
    console.log("connected to DataBase");
  })
  .catch(function (err) {
    console.log(err, "Something went wrong");
  });

app.use(morgan("tiny"));
app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = require("./routes/Router.js")
app.use("/api",router)

app.get("/", (req,res) => {
  res.json({Message:`Server running on port ${PORT}`})
});

const PORT = process.env.PORT||3000;
app.listen(PORT, () => {
  console.log(`server is running in port ${PORT}` );
});
