const Job = require("../models/jobSchema");
const users = require("../models/userSchema");
const Application = require("../models/applicationSchema");

exports.getAllUser=async(req,res)=>{
    try {
      const item=await users.find();
      res.status(200).json(item)

    } catch (error) {
      
    }

}

exports.getallJobs=async(req,res)=>{
  try {
    const item=await Job.find()
    res.status(200).json(item)
  } catch (error) {
    
  }
}

exports.getAllApplication=async(req,res)=>{
  try {
    const item=await Application.find()
    res.status(200).json(item)
  } catch (error) {
    
  }
}

exports.deleteEmployees=async(req,res)=>{
  try {
  const {id}=req.params;
  const item=await users.findByIdAndDelete(id);
  res.status(200).json("deleted successfully");
  } catch (error) {
    
  }
}