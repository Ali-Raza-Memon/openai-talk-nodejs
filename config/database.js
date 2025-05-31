const mongoose = require("mongoose");
require('dotenv').config();

const connectDatabase = () => {
    console.log("MongoDB URL:", process.env.MONGO_URL);
    mongoose
        .connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((data) => {
            console.log(`MongoDB connected with server: ${data.connection.host}`);
        })
        .catch((err) => {
            console.error("Database connection error:", err.message);
        });
};

module.exports = connectDatabase;
