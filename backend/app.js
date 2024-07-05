const express = require('express');
const { connectToDb } = require('./connectDB/connect');
const User = require('./models/user');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use(express.json());

// Start the server
app.listen(port, () => {
    connectToDb();
    console.log(`Server is running at http://localhost:${port}`);
});