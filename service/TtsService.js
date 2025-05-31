const openai = require("../config/openaiClient");

exports.convertToSpeech = async (text) => {
    const ttsResponse = await openai.audio.speech.create({
        model: "tts-1",
        speed: 1.25,
        input: text,
        voice: "nova"
    });

    const audioBuffer = Buffer.from(await ttsResponse.arrayBuffer());
    return audioBuffer.toString("base64");
};
