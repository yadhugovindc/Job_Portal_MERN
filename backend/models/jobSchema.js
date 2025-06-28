const mongoose=require('mongoose');

const jobSchema=new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  country:{
    type:String,
    required:true
  },
  city:{
    type:String,
    required:true
  },
  location:{
    type:String,
    required:true
  },
  salary:{
    type:String,
    required:true
  },
  expired:{
    type:Boolean,
   default:false
  },
  jobPostedOn:{
    type:Date,
    default:Date.now
  },
  postedBy:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true
  },

})

const Job=mongoose.model('Job',jobSchema);
module.exports=Job;