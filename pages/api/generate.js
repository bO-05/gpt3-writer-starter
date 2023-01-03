import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix =
// `
// Write an in-depth target market and potential value proposition for the next business idea. The business idea is utilizing AI, and it's about:
// `
`Tulis target pasar yang mendalam dan proposisi nilai potensial untuk ide bisnis berikut. Ide Bisnis berikut ini memanfaatkan kecerdasan buatan (AI), dan ini tentang:`

const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 300,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
