const Application = require("../models/applicationSchema");
const Job = require("../models/jobSchema");


exports.submitApplication = async (req, res) => {
  console.log("inside submitappli controller");
  const { id, role } = req.user;
  const resume = req.file.filename;

  if (role === "employer") {
    return res.status(403).json("employer not allowed to apply for job");
  }
  try {
    const { name, email, phone_no, address, cover_letter, jobId } = req.body;
    if (
      !name ||
      !email ||
      !phone_no ||
      !address ||
      !cover_letter ||
      !jobId ||
      !resume
    ) {
      return res.status(400).json("missing fields");
    }

    const item = await Job.findById(jobId);
    const employerId = item.postedBy;
    const jobTitle = item.title;

    console.log("employerid is", employerId);
    console.log("employerid is", id, role);
    console.log(
      "others",
      name,
      email,
      phone_no,
      address,
      cover_letter,
      jobId,
      resume
    );

    const newApplication = new Application({
      name,
      email,
      phone_no,
      address,
      cover_letter,
      jobTitle,
      resume,
      jobId,
      applicantId: id,
      employerId,
    });
    await newApplication.save();
    return res.status(200).json("successfully submitted application");
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

exports.viewYourApplications = async (req, res) => {
  const { id, role } = req.user;
  if(role==='employer'){
    return res.status(403).json("job seeker not allowed this resource")
  }
  try {
    const application = await Application.find({ applicantId: id });
   if(application.length===0){
    return res.status(404).json("no applications found")
   }
  return res.status(200).json({ message: "successfully retrieve ur application", application });
  } catch (error) {
  return res.status(500).json({ error: "Internal server error", details: error.message });
  }
 
};

exports.deleteApplication = async (req, res) => {
  const { role } = req.user;
  const { id } = req.params;
  if (role === "employer") {
    return res.status(403).json("employer is not allowed to delete");
  }
  try {
    const appItem = await Application.findById(id);
    if (!appItem) {
      return res.status(400).json("application not found");
    }
    await appItem.deleteOne();
    return res.status(200).json("Application deleted successfully");
  } catch (error) {
    return res.status(500).json({ error: "Internal server error", details: error.message })
  }
};

exports.viewEmployerApplication=async(req,res)=>{
  const {id,role}=req.user;
  if(role==='job seeker'){
    return res.status(403).json("job seeker not allowed this page");
  }
  try {
     const item=await Application.find({employerId:id});
  if(!item){
    return res.status(404).json("not found the item");
  }
  return res.status(200).json({message:"successfully retrieve",item})
  } catch (error) {
    return res.status(500).json({ error: "Internal server error", details: error.message })
  }
    
}

exports.updateStatus=async(req,res)=>{
  const {role}=req.user;
  const { id } = req.params;

   if(role==='job seeker'){
    return res.status(403).json("job seeker not allowed this action");
   }
   try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json("body cannot have empty fields");
    }
    let editStatus=await Application.findByIdAndUpdate(id,req.body,{new:true});

    return res.status(200).json("successfully updated job status")
    
   } catch (error) {
    return res.status(500).json({ error: "Internal server error", details: error.message });
   }
}

exports.updateApplication=async(req,res)=>{
  const {role}=req.user;
  const {id}=req.params;
   
   const updateData={
     name:req.body.name,
     email:req.body.email,
     phone_no:req.body.phone_no,
     address:req.body.address,
     cover_letter:req.body.cover_letter
   }

   if(req.file){
     updateData.resume=req.file.filename
   }
   
   
  try {
    if(Object.keys(req.body).length===0){
      return res.status(400).json('req body is empty')
    }
    const item=await Application.findByIdAndUpdate(id,updateData,{new:true});
    if(!item){
        return res.status(404).json('not found application')
    }
     return res.status(200).json("successfully updated the application")

  } catch (error) {
    return res.status(500).json({ error: "Internal server error", details: error.message });
  }
  
}

