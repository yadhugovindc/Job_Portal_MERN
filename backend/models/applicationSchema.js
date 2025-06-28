const mongoose=require('mongoose');

const applicationSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  phone_no:{
     type:Number,
    required:true
  },
  address:{
     type:String,
    required:true
  },
  cover_letter:{
    type:String,
    required:true
  },
  jobTitle:{
    type:String,
    required:true
  },
  applicantId:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true
  },
  employerId:{
    type:mongoose.Schema.ObjectId,
    ref:"Job",
    required:true
  },
  jobId:{
    type:mongoose.Schema.ObjectId,
    ref:"Job",
    required:true
  },
  resume:{
    type:String,
    required:true
  },
  jobStatus:{
    type:String,
    enum:["submitted","viewed","rejected","accepted"],
    default:"submitted",
    required:true
  }
})

const Application=mongoose.model('Application',applicationSchema);

module.exports=Application;