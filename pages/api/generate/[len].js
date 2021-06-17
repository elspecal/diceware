import { rollDice } from '/lib/lib';

async function generatePhrase(len) {
  const roll = rollDice(5);
  const url = `${process.env.API_URL}/${roll}.json`;
  const response = await fetch(url);
  const word = await response.json();

  return len ? `${await generatePhrase(len - 1)} ${word}` : '';
}

export default async function (req, res) {
  const len = +req.query.len;
  const words = await generatePhrase(len);
  res.status(200).send(JSON.stringify(words));
}
