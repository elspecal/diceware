import { randomInt } from 'crypto';
import S from 'sanctuary';
/**
 * Passes the given message to the logger.
 * @param {String} msg Log message.
 * @returns Logger function.
 */
export const trace =
  msg =>
  /**
   * Prints the log message and its input to stdout.
   * @param {*} x The state to be logged (i.e. the output of the function it is
   * chained after / applied to).
   * @returns Its input after printing it next to the log message.
   */
  x => {
    console.log(`\n==> ${msg}: ${JSON.stringify(x)}`);
    return x;
  };

/**
 * Rolls the dice (i.e. generates a random number 1-6) N times.
 * @param {Number} n The number of desired dice rolls.
 * @returns A concatenated string of results.
 */
const rollDice = n => (n ? `${rollDice(n - 1)}${randomInt(1, 7)}` : '');
export function findPhrase(dictionary) {
  return S.prop(rollDice(5))(dictionary);
}
