const mongoose = require("mongoose");

const AddNewWorkout = async (req, res) => {

  const workoutModel = mongoose.model("workouts");
  const { title, reps, load } = req.body;

  // Validations
  if (!title) throw 'Title is Requireds';
  if (!reps) throw 'Reps are requireds';
  if (!load) throw 'Load is Requireds';

  
  const user_id= req.user._id;  
  const createNewWorkout = await workoutModel.create({
    title: title,
    reps: reps,
    load: load,
    user_id:user_id
  });

  res.status(201).json(createNewWorkout);



}

module.exports = AddNewWorkout;