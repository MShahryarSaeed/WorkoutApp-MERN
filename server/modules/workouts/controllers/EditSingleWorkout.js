const mongoose=require("mongoose");

const EditSingleWorkout=async(req,res)=>{

  const workoutModel = mongoose.model("workouts");
  const{id}=req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({
      error:"No Such Workout"
    })
  }

  const editWorkout=await workoutModel.findOneAndUpdate({_id:id},{...req.body},{new:true});

  if(!editWorkout) throw 'No Workout Present for this Particular Id';

  res.status(200).json(editWorkout);



}

module.exports=EditSingleWorkout