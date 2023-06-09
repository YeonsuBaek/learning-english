const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const before = req.body.before || '';
  const after = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Correct ${before} to standard English. No additional explanation needed.`,
    temperature: 0,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  res.status(200).json({ after: after.data.choices[0].text });
}
