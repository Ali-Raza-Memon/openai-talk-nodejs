const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const execPromise = promisify(require("child_process").exec);
const openai = require("../config/openaiClient");

exports.processAudio = async (audioBuffer,language) => {
    if (!audioBuffer) throw new Error("Audio buffer is required.");

    const uploadDir = path.join(__dirname, "../../uploads");
    await fs.promises.mkdir(uploadDir, { recursive: true });

    const fileName = `audio_${Date.now()}.wav`;
    const filePath = path.join(uploadDir, fileName);

    await fs.promises.writeFile(filePath, Buffer.from(audioBuffer, "base64"));

    const convertedFilePath = filePath.replace(".wav", "_converted.wav");
    await execPromise(`ffmpeg -i "${filePath}" -acodec pcm_s16le -ar 16000 -ac 1 "${convertedFilePath}"`);
    await fs.promises.unlink(filePath);

    const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(convertedFilePath),
        model: "whisper-1",
        language
    });

    await fs.promises.unlink(convertedFilePath);
    return transcription.text.trim();
};
