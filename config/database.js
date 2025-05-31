const mongoose = require("mongoose");
require("dotenv").config();

const {
    MONGO_DB_NAME,
    MONGO_HOST,
    MONGO_PORT
} = process.env;

if (!MONGO_DB_NAME) {
    throw new Error("MONGO_DB_NAME is missing in .env");
}

const mongoUri = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`;

const connectDatabase = () => {
    console.log("MongoDB URI:", mongoUri);

    mongoose
        .connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(({ connection }) =>
            console.log(`MongoDB connected on host: ${connection.host}`)
        )
        .catch((err) =>
            console.error("Database connection error:", err.message)
        );
};

module.exports = connectDatabase;
