const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");

const app = express();
const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//db
db.sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully.");
  })
  .catch((err) => {
    console.error("Unable to sync database:", err);
  });

app.get("/", (req, res) => {
  res.render("index", { title: "Task Manager" });
});

const taskRoutes = require("./routes/taskRoutes");
app.use("/tasks", taskRoutes);

const categoryRoutes = require("./routes/categoryRoutes");
app.use("/categories", categoryRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});