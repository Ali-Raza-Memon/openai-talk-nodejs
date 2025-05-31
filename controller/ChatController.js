const {processAudio} = require("../service/AudioService");
const {convertToSpeech} = require("../service/TtsService");
const {streamChatLLM} = require("../service/ChatLLMService");

exports.chatAudioProcessing = async (socket, audioBuffer, language) => {
    const sessionId = "680f83b167ed1d8f8712be77"; // this static id just for testing purpose
    try {
        const transcriptionText = await processAudio(audioBuffer,language);

        const gptResponse = await streamChatLLM(transcriptionText, sessionId,language);

        const voiceResponse = await convertToSpeech(gptResponse);
        socket.emit("chat-response", {
            transcription: transcriptionText,
            chatGptResponse: gptResponse,
            voiceResponse
        });

        console.log("Full GPT Response Sent!");
    } catch (error) {
        console.error(" Error in handleAudioProcessing:", error.message || error);
        socket.emit("error", { error: "Internal Server Error." });
    }
};
