const express = require('express');
const { connectToDb } = require('./connectDB/connect');
const User = require('./models/user');
const cors=require("cors")
const app = express();
const port = 4000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Route to handle user signup
app.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password, gender, username, profilePicture } = req.body;

    // Check if email or username already exists (optional step)

    // Create a new user instance
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,  // Ensure this is hashed before saving (using bcrypt, for example)
      gender,
      username,
      profilePicture,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json(savedUser); // Respond with the saved user object
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Default route
app.get('/', (req, res) => {
  res.send("Hello World");
});

// Start the server
app.listen(port, () => {
  connectToDb()
    .then(() => {
      console.log(`Server is running at http://localhost:${port}`);
    })
    .catch((err) => console.error('Error connecting to MongoDB:', err));
});