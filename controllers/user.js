import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

import { sendCookie } from "../utils/features.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(404).json({
        success: false,
        message: "Invalid Email or Password",
      });
    console.log("hi");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(404).json({
        success: false,
        message: "Invalid Email or Password",
      });

    sendCookie(user, res, `Welcome back , ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user)
    return res.status(404).json({
      success: false,
      message: "User Already Exist",
    });

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};
