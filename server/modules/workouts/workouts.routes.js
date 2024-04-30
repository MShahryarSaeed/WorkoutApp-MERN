const express=require("express");
// All Routes
const GetSingleWorkout = require("./controllers/GetSingleWorkout");
const GetAllWorkouts = require("./controllers/GetAllWorkouts");
const AddNewWorkout = require("./controllers/AddNewWorkout");
const EditSingleWorkout = require("./controllers/EditSingleWorkout");
const DeleteSingleWorkout = require("./controllers/DeleteSingleWorkout");
const auth = require("../../middleware/auth");



const workoutsRoutes=express.Router();
// Middleware
workoutsRoutes.use(auth);
// Protected Routes
workoutsRoutes.get('/:id',GetSingleWorkout);
workoutsRoutes.get('/',GetAllWorkouts)
workoutsRoutes.post('/',AddNewWorkout);
workoutsRoutes.patch('/:id',EditSingleWorkout);
workoutsRoutes.delete('/:id',DeleteSingleWorkout)


module.exports=workoutsRoutes;