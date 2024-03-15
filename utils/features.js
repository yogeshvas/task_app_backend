import jwt from "jsonwebtoken";
export const sendCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 1500 * 60 * 1000,
          sameSite: "none",
    secure: false,
    })
    .json({
      success: true,
      message,
    });
};
