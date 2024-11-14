require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('./../models/user');
const bcrypt = require('bcryptjs');

// Function to generate JWT token
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Sign Up Function
const signup = async (req, res) => {
  const { name, email, password, address } = req.body;

  // Check if all required fields are present
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  // Check if the email already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'Email is already registered' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = new User({
    name,
    email,
    password: hashedPassword, // Set the hashed password
    address,
  });

  // Save the new user to the database
  await newUser.save();
  res.status(201).json({ message: 'Signup successful', userId: newUser._id });
};

// Sign In Function
const signin = async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If the user does not exist or password does not match, return error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate token
    const payload = {
      id: user._id,
      email: user.email,
      name: user.name
    };
    const token = generateToken(payload); // Use the generateToken function

    // Return token as response
    res.json({ token });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { signup, signin };
