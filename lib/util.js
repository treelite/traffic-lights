/**
 * @file Util tools
 * @author treelite(c.xinle@gmail.com)
 */

/**
 * Multiples for seconds
 *
 * @const
 * @type {Array}
 */
const MULTIPLES = [60 * 60, 60, 1];

/**
 * Day in seconds
 *
 * @const
 * @type {number}
 */
const DAY_IN_SECONDS = 24 * 60 * 60;

/**
 * Parse time to seconds
 *
 * @public
 * @param {string} str Time string HH:mm:ss
 * @return {number} Time in seconds
 */
export function parse(str) {
    str = str.split(':');

    if (str.length > 3) {
        return 0;
    }

    if (str.length === 1) {
        return parseInt(str, 10);
    }

    let res = 0;
    for (let [index, value] of str.entries()) {
        res += MULTIPLES[index] * parseInt(value, 10);
    }

    return res;
}

/**
 * Format time for HH:mm:ss
 *
 * @public
 * @param {number} time Time in seconds
 * @return {string} Time string
 */
export function format(time) {
    let res = [];
    time = time % DAY_IN_SECONDS;

    for (let value of MULTIPLES) {
        let v = Math.floor(time / value);
        time = time % value;
        res.push((v < 10 ? '0' : '') + v);
    }

    return res.join(':');
}
