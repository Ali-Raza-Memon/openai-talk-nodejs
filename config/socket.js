const {Server} = require("socket.io");

const welcomeTesting = require("../socket-manager/ChatTestingSocket");

function initSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: process.env.CORS_ORIGIN,
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        },
    });
    welcomeTesting(io);
}

module.exports = {initSocket};
