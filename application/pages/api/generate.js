const { Configuration, OpenAIApi } = require('openai');
import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/.env' });

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const before = req.body.before || '';
  const after = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Correct ${before} to standard English. If '${before}' is not a standard English, return 'Not Found'`,
    temperature: 0,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  res.status(200).json({ after: after.data.choices[0].text });
}
