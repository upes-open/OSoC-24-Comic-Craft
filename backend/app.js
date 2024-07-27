const express = require("express");
const { connectToDb } = require("./connectDB/connect");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const comicRoutes = require("./routes/comicRoutes");
const generateDialogue = require("./routes/generateDialogues");
const overlay = require("./routes/overlay");
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 4000;

// Set JWT secret directly in the code
const JWT_SECRET = "your_jwt_secret_here"; // Replace 'your_jwt_secret_here' with your actual secret

// Middleware to parse JSON bodies
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    credentials: true, // Allow sending cookies with requests
  })
);

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    next();
  });
};

app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/proxy-image', async (req, res) => {
  try {
      const imageUrl = req.query.url;
      const index = req.query.index; // Get index from query parameters
      if (!imageUrl || index === undefined) {
          return res.status(400).send('Image URL and index are required');
      }

      // Validate URL (simple validation to check if URL is absolute)
      try {
          new URL(imageUrl);
      } catch (e) {
          return res.status(400).send('Invalid URL');
      }

      const response = await fetch(imageUrl);
      if (!response.ok) {
          throw new Error('Error fetching image');
      }

      const buffer = await response.buffer();
      const imageFileName = `image_${index}.png`; // Use index for filename
      const imagePath = path.join(__dirname, 'images', imageFileName);

      fs.writeFileSync(imagePath, buffer); // Write image to 'images' folder

      res.status(200).send(imageFileName); // Send the filename back to client
  } catch (error) {
      console.error('Error fetching image:', error);
      res.status(500).send('Error fetching image');
  }
});


app.get('/download-image', (req, res) => {
  const { filename } = req.query;
  const imagePath = path.join(__dirname, 'images', filename);

  res.download(imagePath, (err) => {
    if (err) {
      console.error('Error downloading image:', err);
      res.status(500).send('Error downloading image');
    }
  });
});

app.get('/list-images', (req, res) => {
  const imagesFolder = path.join(__dirname, 'images');
  fs.readdir(imagesFolder, (err, files) => {
    if (err) {
      console.error('Error reading images folder:', err);
      return res.status(500).send('Error reading images folder');
    }
    res.status(200).json(files.filter(file => file.endsWith('.png')));
  });
});


// Api for comic generation
app.use("/comic", comicRoutes);

// Api for dialogue generation
app.use("/generate-dialogue", generateDialogue); // Use the new route
app.use('/process-image', overlay);


// Route to handle user signup
app.post("/signup", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      gender,
      username,
      profilePicture,
    } = req.body;

    // Check if email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email or username already exists" });
    }

    // Create a new user instance
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: await bcrypt.hash(password, 10), // Hash password before saving
      gender,
      username,
      profilePicture,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json(savedUser); // Respond with the saved user object
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Route to handle user login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ username: user.username }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set token as cookie (secure httpOnly cookie)
    res
      .cookie("token", token, { httpOnly: true })
      .status(200)
      .json({ message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Protected route example
app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

// Default route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start the server
app.listen(port, () => {
  connectToDb()
    .then(() => {
      console.log(`Server is running at http://localhost:${port}`);
    })
    .catch((err) => console.error("Error connecting to MongoDB:", err));
});