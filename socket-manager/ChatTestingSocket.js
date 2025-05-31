const welcomeController = require("../controller/ChatController");

const initializeSockets = (io) => {
    const audioSave = io.of("/chat");

    audioSave.on("connection", (socket) => {
        socket.on("chat-message", async (data) => {
            try {
                const { audioBuffer, language } = data || {};

                if (!audioBuffer || !language) {
                    throw new Error("audioBuffer and language are required fields.");
                }
                await welcomeController.chatAudioProcessing(socket, audioBuffer, language);
            } catch (error) {
                console.error(`Error handling welcome-testing-screen for ${socket.id}:`, error.message || error);
                socket.emit("error", { error: error.message || "Failed to process audio buffer." });
            }
        });

        socket.on("disconnect", () => {
            console.log(`🔌 User disconnected: ${socket.id}`);
        });
    });
};

module.exports = initializeSockets;
