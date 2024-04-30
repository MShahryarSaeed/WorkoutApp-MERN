const mongoose=require("mongoose");

const GetAllWorkouts=async(req,res)=>{

  const workoutModel = mongoose.model("workouts");
  const user_id=req.user._id;

  const AllWorkouts=await workoutModel.find({user_id:user_id}).sort({createdAt:-1});


  res.status(200).json(AllWorkouts);



}

module.exports=GetAllWorkouts;