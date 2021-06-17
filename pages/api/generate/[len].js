import { findPhrase } from '/lib/lib';

const { API_URL, ENDPOINT } = process.env;

function generate(dictionary, n) {
  return n ? `${generate(dictionary, n - 1)} ${findPhrase(dictionary)}` : '';
}

async function fetchPhrases(len) {
  const response = await fetch(API_URL + ENDPOINT);
  const dictionary = await response.json();
  return generate(dictionary, len);
}

export default async function (req, res) {
  const len = +req.query.len;
  const words = await fetchPhrases(len);
  res.status(200).send(JSON.stringify(words));
}
