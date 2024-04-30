const mongoose = require("mongoose");


const workoutSchema = new mongoose.Schema({

  title: {
    type: String,
    required: [true, 'Title is Required']
  },
  reps: {
    type: Number,
    required: [true, 'Reps are Required']
  },
  load: {
    type: Number,
    required: [true, 'Load is Required']
  },
  user_id: {
    type: String,
    required:true
  }
}, {
  timestamps: true
});

const workoutModel = mongoose.model("workouts", workoutSchema);

module.exports = workoutModel;