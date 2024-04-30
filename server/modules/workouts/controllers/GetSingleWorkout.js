const mongoose=require("mongoose");


const GetSingleWorkout=async(req,res)=>{

  const workoutModel = mongoose.model("workouts");
  const{id}=req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({
      error:"No Such Workout"
    })
  }

  const singleWorkout=await workoutModel.findOne({_id:id});

  if(!singleWorkout) throw 'No Workout Present for this Particular Id';


  res.status(200).json(singleWorkout);

}

module.exports=GetSingleWorkout;