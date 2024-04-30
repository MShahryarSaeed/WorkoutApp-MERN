const mongoose=require("mongoose");

const DeleteSingleWorkout=async(req,res)=>{

  const workoutModel = mongoose.model("workouts");
  const{id}=req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({
      error:"No Such Workout"
    })
  }

  const deletedWorkout=await workoutModel.findOneAndDelete({
    _id:id
  });

  if(!deletedWorkout) throw 'No Workout Present for this Particular Id';

  res.status(200).json(deletedWorkout);

}

module.exports=DeleteSingleWorkout;