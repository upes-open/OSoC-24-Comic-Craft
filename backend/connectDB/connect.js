const mongoose=require('mongoose');

const connectToDb = async () => {
    try {
        await mongoose.connect("mongodb+srv://contributors:OSoc2024@cluster0.dctk8v8.mongodb.net/Comic-Craft?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to Database successfully")
    } catch (error) {
        console.log("Error in connecting to database", error)
    }
}

module.exports = { connectToDb };