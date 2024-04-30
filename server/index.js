// All imports
require("dotenv").config();
require("express-async-errors");
const cors = require('cors');
const express = require("express");
const mongoose = require("mongoose");
const errorHandler = require("./handlers/errorHandler");
const workoutsRoutes = require("./modules/workouts/workouts.routes");
const userRoutes = require("./modules/users/users.routes");

const app = express();
app.use(cors());


// Middlewares
app.use(express.json());
app.use((req, res, next) => {

  console.log(req.path, req.method);

  next();
})


// Basic GET Method
app.get('/', (req, res) => {
  res.send("Hello Wolrd From Workout App Server");
});

// Connection with MongoDB Atlas
mongoose.connect(process.env.mongo_connection, {}).
  then(() => console.log("Connected to MongoDB Atlas Successfully"))
  .catch((error) => console.log("Error While Conecting to MongoDB Atlas", error));

// Models initializations
require('./models/workout.model');
require('./models/user.Model');

// Routes Initialization
app.use('/api/workouts', workoutsRoutes);
app.use('/api/users', userRoutes);

// End of All Routes
app.all("*", (req, res) => {
  res.status(404).json({
    status: "Failed",
    message: "Not Found"
  })
})


// errorHandler
app.use(errorHandler);

// Server Initialization
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT}`);
})

module.exports = app;