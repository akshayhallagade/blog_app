const crypto = require("crypto");
const User = require("../models/user");
const { generateToken } = require("../lib/token_gen");

exports.handleUserSignup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const salt = crypto.randomBytes(256).toString("hex");
    const hashedPassword = crypto
      .createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    const user = await User.create({
      firstName,
      lastName,
      salt,
      email,
      password: hashedPassword,
    });
    return res.json({ status: "Success", data: { _id: user.id } });
  } catch (err) {
    return res.json({ error: err });
  }
};

exports.handleUserSignin = async (req, res) => {
  const { email, password } = req.body;
  const userInDb = await User.findOne({ email });

  //if email not in database
  if (!userInDb) {
    return res
      .status(401)
      .json({ error: `user with email ${email} not found.` });
  }

  const hashedPassword = crypto
    .createHmac("sha256", userInDb.salt)
    .update(password)
    .digest("hex");

  //if email and password matched
  if (hashedPassword === userInDb.password) {
    const token = generateToken({ _id: userInDb._id });
    return res.json({
      status: "success",
      message: `Welcome ${userInDb.firstName} ${userInDb.lastName}!`,
      Token: token,
    });
  }

  //if password doesn't matched correctly
  return res.json({
    status: 200,
    message: "username or password is incorrect ! ",
  });
};
