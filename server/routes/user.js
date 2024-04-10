import express from "express";
import bcryt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { User } from '../models/User.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, email, password, dob, age, address, city, state } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ message: 'user already existed' });
    }

    const hashpassword = await bcryt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashpassword,
      dob,
      age,
      address,
      city,
      state,
    });

    await newUser.save();
    return res.json({ status: true, message: 'record registered' });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, message: 'error registering user' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: 'user is not registered' });
    }

    const validPassword = await bcryt.compare(password, user.password);
    if (!validPassword) {
      return res.json({ message: 'password is incorrect' });
    }

    const token = jwt.sign({ username: user.username }, process.env.KEY, {
      expiresIn: '1h',
    });
    res.cookie('token', token, { httpOnly: true, maxAge: 360000 });
    return res.json({ status: true, message: 'login successfully' });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, message: 'error logging in' });
  }
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: 'user not registered' });
    }
    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: '5m',
    });

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kkprinceak@gmail.com',
        pass: 'your pass key',
      },
    });
    const encodedToken = encodeURIComponent(token).replace(/\./g, '%2E');
    var mailOptions = {
      from: 'kkprinceak@gmail.com',
      to: email,
      subject: 'Reset Password',
      text: `http://localhost:5173/resetPassword/${encodedToken}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ message: "error sending email" });
      } else {
        return res.json({ status: true, message: "email sent" });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decoded = await jwt.verify(token, process.env.KEY);
    const id = decoded.id;
    const hashPassword = await bcryt.hash(password, 10);
    await User.findByIdAndUpdate({ _id: id }, { password: hashPassword });
    return res.json({ status: true, message: "updated password" });
  } catch (err) {
    return res.json("invalid token");
  }
});

const verifyUser = async (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.json({ status: false, message: "no token" });
      }
      const decoded = await jwt.verify(token, process.env.KEY);
      next()
  
    } catch (err) {
      return res.json(err);
    }
  };
  


router.get("/verify",verifyUser, (req, res) => {
    return res.json({status: true, message: "authorized"})
});

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({status: true})
})


router.post("/update-profile", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.KEY);
    const userId = decoded.id;

    const { name, age, gender, location } = req.body;

    // Update user profile in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, age, gender, location },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.json({ status: false, message: "User not found" });
    }

    return res.json({ status: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.json({ status: false, message: "Failed to update profile" });
  }
});

export { router as UserRouter };