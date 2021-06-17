import { findPhrase } from '/lib/lib';

const ENDPOINT =
  'https://diceware-10a8f-default-rtdb.europe-west1.firebasedatabase.app/dictionary.json';

function generate(dictionary, n) {
  return n ? `${generate(dictionary, n - 1)} ${findPhrase(dictionary)}` : '';
}

async function fetchPhrases(len) {
  const response = await fetch(ENDPOINT);
  const dictionary = await response.json();
  return generate(dictionary, len);
}

export default async function (req, res) {
  const len = +req.query.len;
  const words = await fetchPhrases(len);
  res.status(200).send(JSON.stringify(words));
}
