const users = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  console.log("Inside register user controller");
  const { name, email, phone, password, role } = req.body;
  if (!name || !email || !phone || !password || !role) {
    return res.status(400).json("fill all the columns");
  }

  try {
    const isEmailRegistered = await users.findOne({ email });
    if (isEmailRegistered) {
      return res.status(400).json("This email already registered");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new users({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res.status(201).json(`${name} is registered successfully`);
  } catch (error) {
    console.log("error registering user", error);
    res.status(500).json("internal error");
  }
};

exports.loginUser = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json("please fill all the fields");
  }
  try {
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(400).json("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json("password incorrect");
    }

    if (user.role!="super admin" && user.role !== role) {
      return res
        .status(404)
        .json(`User with provided email and ${role} is not found`);
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    console.log("token is", token);

    res.status(200).json({
      success: true,
      message: "successfully logged in",
      user_data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      jwt_token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("internal server error");
  }
};

exports.getUserProfile = async (req, res) => {
  const { id } = req.user;
  try {
    const profile = await users.findById(id);
    if (!profile) {
      return res.status(404).json("profile not found");
    }
    return res.status(200).json(profile);
  } catch (err) {
    console.log(err);
    return res.status(500).json("internal server error");
  }
};
