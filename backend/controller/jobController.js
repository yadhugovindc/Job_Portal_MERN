const Job = require("../models/jobSchema");

exports.getAlljobs = async (req, res) => {
  try {
    const jobs = await Job.find({ expired: false });
    if (!jobs) {
      return res.status(404).json("No active jobs found");
    }
    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

exports.postJob = async (req, res) => {
  const { id, role } = req.user;
  if (role === "job seeker") {
    return res.status(403).json("job seeker is not allowed to post job");
  }
  try {
    const { title, description, category, country, city, location, salary } =
      req.body;
    if (
      !title ||
      !description ||
      !category ||
      !country ||
      !city ||
      !location ||
      !salary
    ) {
      return res.status(400).json("missing fields in req body");
    }
    const postedBy = req.user.id;
    const job = new Job({
      title,
      description,
      category,
      country,
      city,
      location,
      salary,
      postedBy,
    });
    await job.save();
    return res.status(200).json("successfully posted the job");
  } catch (error) {
    return res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

exports.getMyJob = async (req, res) => {
  const { id, role } = req.user;
  if (role === "job seeker") {
    return res.status(403).json("job seeker is not allowed to this source");
  }
  try {
    const myjobs = await Job.find({ postedBy: id });
    if (myjobs.length === 0) {
      return res.status(404).json("myjobs empty");
    }
    return res.status(200).json({message:'successfully retrieve my jobs',myjobs});
  } catch (error) {
    return res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

exports.getSingleJob = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json("job not found");
    }
    return res.status(200).json({ message: "successfully get the job", job });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  const { role } = req.user;
  const { id } = req.params;
  if (role == "job seeker") {
    return res.status(403).json("not allowed this resource");
  }
  try {
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json("job not found 404");
    }
    await job.deleteOne();
    return res.status(200).json("successfully deleted the job");
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

exports.updateJob = async (req, res) => {
  const { role } = req.user;
  const { id } = req.params;
  if (role === "job seeker") {
    return res.status(403).json("job seeker cannot have the right to edit");
  }
  try {
    let editJob = await Job.findById(id);
    if (!editJob) {
      return res.status(404).json("not found the job");
    }
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json("body cannot have empty fields");
    }
    editJob = await Job.findByIdAndUpdate(id, req.body, { new: true });

    return res
      .status(200)
      .json({ message: "job updated successfully", job: editJob });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};
