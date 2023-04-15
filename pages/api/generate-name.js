import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const { companyDescription } = req.body;
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: generatePrompt(companyDescription),
    temperature: 0.6,
    max_tokens: 2048,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(companyDescription) {
  return `Crea una lista de 4 ideas de nombres para mi empresa que tiene la siguiente descripción:${companyDescription}`;
}
