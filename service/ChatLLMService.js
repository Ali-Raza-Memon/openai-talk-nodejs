const SessionChat = require("../models/SessionChat");
const {chat} = require("../config/openaiClient");

exports.streamChatLLM = async function (transcriptionText, sessionId, language) {
    try {
        let systemPrompt;
        let systemRole;
        let modelName;

        try {
            systemPrompt = 'Pretend you’re my close friend: be warm, casual, and honest; explain things simply, crack light jokes when it feels natural, and always have my back.';
            modelName = 'gpt-4o';
            systemRole = "system";

            const languageNames = {
                en: "English",
                ur: "Urdu",
            };
            const languageName = languageNames[language] || language;
            systemPrompt += `\nIMPORTANT: Always reply ONLY in ${languageName}, regardless of the user's input language.`;
        } catch (error) {
            console.warn("Failed to fetch system prompt. Using default.");
            systemPrompt = "You are an AI assistant that provides helpful responses.";
            systemRole = "system";
            modelName = "gpt-4o";

            const languageNames = {
                en: "English",
                ur: "Urdu",
            };
            const languageName = languageNames[language] || language;
            systemPrompt += `\nIMPORTANT: Always reply ONLY in ${languageName}, regardless of the user's input language.`;
        }

        let chatHistory = await SessionChat.find({ session_id: sessionId })
            .sort({ created_at: 1 })
            .lean();


        if (!chatHistory || chatHistory.length === 0) {
            await SessionChat.create({
                session_id: sessionId,
                role: systemRole,
                chat_message: systemPrompt
            });
            chatHistory = [{
                session_id: sessionId,
                role: systemRole,
                chat_message: systemPrompt,
                created_at: new Date()
            }];
        }

        await SessionChat.create({
            session_id: sessionId,
            role: "user",
            chat_message: transcriptionText
        });

        const formattedChatHistory = chatHistory.map(chat => ({
            role: chat.role,
            content: chat.chat_message
        }));

        const messages = [
            { role: systemRole, content: systemPrompt },
            ...formattedChatHistory,
            { role: "user", content: transcriptionText }
        ];

        console.log("Sending messages to GPT...");

        const completion = await chat.completions.create({
            model: modelName,
            messages: messages,
            stream: false,
        });

        const gptResponse = completion.choices[0].message.content;

        await SessionChat.create({
            session_id: sessionId,
            role: "assistant",
            chat_message: gptResponse
        });

        console.log("Full Response Processed!");
        return gptResponse;

    } catch (error) {
        console.error("GPT Streaming Error:", error.message);
        return "Sorry, an error occurred generating the response.";
    }
};
