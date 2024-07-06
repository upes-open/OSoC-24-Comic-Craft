const express = require('express');
const { connectToDb } = require('./connectDB/connect');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use(express.json());


app.post("/signup", async (req, res) => {
    let { firstName, lastName, email, password, gender, username } = req.body;

    if (!firstName || !lastName || !email || !password || !gender || !username) {
        return res.status(400).send('All required fields must be filled');
    }

    console.log('Signup data:', req.body);

    try {

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User with the same email or contact already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            firstName,
            lastName,
            email,
            password: hash,
            gender,
            username
        });

        const token = jwt.sign({ email }, "tokenGoesHere");
        res.cookie("token", token);

        // res.status(201).redirect('dashboard/' + username);
        res.status(201).json({ message: "User registered successfully" })
    } catch (err) {
        res.status(500).send(err.message);
    }
});


// Start the server
app.listen(port, () => {
    connectToDb();
    console.log(`Server is running at http://localhost:${port}`);
});