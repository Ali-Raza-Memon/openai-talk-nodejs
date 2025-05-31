require("dotenv").config({ path: ".env" });
const app = require("./app");
const connectDatabase = require("./config/database");
const http = require("http");
const {initSocket} = require("./config/socket");


const cors = require("cors");


let corsOptions = {
    origin: process.env.CORS_ORIGIN
};

app.use(cors(corsOptions));

const server = http.createServer(app);

initSocket(server);

connectDatabase();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});





