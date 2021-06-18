import { rollDice } from '../../../lib/lib';

/**
 * Request entries by randomly generated keys and concatenate them.
 * @param {Number} len The number of words the phrase shall contain 1-9.
 * @returns {String} The generated phrase in form of a concatenated String.
 */
async function generatePhrase(len) {
  const roll = rollDice(5);
  const url = `${process.env.API_URL}/${roll}.json`;
  const response = await fetch(url);
  const word = await response.json();
  console.log(word);
  return len ? `${await generatePhrase(len - 1)} ${word}` : '';
}

export default async function (req, res) {
  const len = +req.query.len;
  const phrase = await generatePhrase(len);
  console.log(phrase);
  res.status(200).send(JSON.stringify(phrase.trim()));
}
