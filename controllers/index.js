const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const history = [];
dotenv.config();

// GoogleGenerativeAI required config
const configuration = new GoogleGenerativeAI(process.env.API_KEY);

// Model initialization
const modelId = "gemini-pro";
const generationConfig = {
    stopSequences: ["red"],
    maxOutputTokens: 200,
    temperature: 0.9,
    topP: 0.1,
    topK: 16,
  };

  const model = configuration.getGenerativeModel({ model: modelId, generationConfig });


  /**
 * Generates a response based on the given prompt.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise} - A promise that resolves when the response is sent.
 */
const generateResponse = async (req, res) => {
    try {
      const { prompt } = req.body;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      // pusing response text in history
      history.push(text);

      res.send({ response: text });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };


  const generateChatResonse = async (req, res) => {
    try {
      const { prompt } = req.body;
      // specifying model id for chat
      model['modelId'] = 'gemini-1.0-pro'

      const chat = model.startChat({});

      const chatInput1 = 'How can I learn more about that?';
      const result1 = await chat.sendMessageStream(prompt);
      for await (const item of result1.stream) {
        console.log('result1',item.candidates[0].content.parts[0].text);
      }

      res.send({ response: [] });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }


  module.exports = {
    generateResponse,
    generateChatResonse,
    history,
  };