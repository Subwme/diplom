const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");
const cors = require("cors");
const initData = require("./connectData/initData");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api", routes);

const PORT = config.get("port") ?? 8080;

if (process.env.NODE_ENV === "production") {
  console.log(chalk.red("environment => PROD"));
} else {
  console.log(chalk.red("environment => DEV"));
}

async function start() {
  try {
    //connect category
    mongoose.connection.once("open", () => {
      initData();
    });

    //connect mongo
    await mongoose.connect(config.get("mongoUri"));
    console.log(chalk.bgGreen("MongoDB conected..."));

    app.listen(PORT, () => {
      console.log(chalk.green(`Server has been started on PORT: ${PORT}...`));
    });
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
}

start();
