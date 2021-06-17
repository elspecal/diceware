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
 * Rolls the dice (i.e. generates random numbers 1-6) N times.
 * @param {Number} n The number of desired dice rolls.
 * @returns A concatenated string of results.
 */
export function rollDice(n) {
  return n ? `${rollDice(n - 1)}${randomInt(1, 7)}` : '';
}

/**
 * Generates a key (5 char long string of digits) and retreives the
 * corresponding word.
 * @param {Object.<String, String>} dictionary From which to get the words.
 * @returns The word as string that corresponds to the generated key.
 */
export function findPhrase(dictionary) {
  return S.prop(rollDice(5))(dictionary);
}
