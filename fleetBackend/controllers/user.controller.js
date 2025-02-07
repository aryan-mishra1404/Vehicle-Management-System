import User from "../models/User.js";
import bcrypt from "bcrypt";

export const userSignUp = async (req, res) => {
  try {
    console.log("INto the fucniton!!");
    const { email, password, role } = req.body;
    console.log("rea.boud", req.body);

    if (!email) return res.status(400).json({ error: "Email is required!" });
    else if (!email.includes("@"))
      return res.status(422).json({ error: "Invalid email format" });
    else if (!password)
      return res.status(400).json({ error: "Password is required!" });

    let user = await User.findOne({ email });
    if (user) return res.status(409).json({ error: "User already exists!" });

    user = await User.create({
      email,
      password,
      role,
    });

    res.status(201).json({ data: user, message: "User created successfully!" });
  } catch (error) {
    console.log("error:  ", error);
    res.status(500).json({ error: error });
  }
};

export const userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("int the signin funciton");

    if (!email) return res.status(400).json({ error: "Email is required!" });
    else if (!email.includes("@"))
      return res.status(422).json({ error: "Invalid email format" });
    else if (!password)
      return res.status(400).json({ error: "Password is required!" });

    let user = await User.findOne({ email }).select("+password");
    console.log("loggin user:  ", user);
    if (!user) return res.status(404).json({ error: "User does not exist!" });

    const isPasswordMatch = user.isPasswordCorrect(password);
    console.log("isPassword Match: ", isPasswordMatch);
    if (!isPasswordMatch)
      return res.status(400).json({ error: "Passwords do not match!" });

    res
      .status(200)
      .json({ user: user, message: "User logged in Successfully!" });
  } catch (error) {
    console.log("int th ecatch", error);
    res.status(500).json({ error: error });
  }
};
