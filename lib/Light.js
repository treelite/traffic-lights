/**
 * @file Traffic light
 * @author treelite(c.xinle@gmail.com)
 */

import EventEmitter from 'events';
import {
    STATUS_RED, STATUS_YELLOW, STATUS_GREEN,
    DURATION_GREEN, DURATION_RED, DURATION_YELLOW,
    TIME_CYCLE
} from './status';

/**
 * Light cycle
 *
 * @type {Array}
 */
let cycle = [
    {status: STATUS_RED, duration: DURATION_RED},
    {status: STATUS_GREEN, duration: DURATION_GREEN},
    {status: STATUS_YELLOW, duration: DURATION_YELLOW}
];

/**
 * Traffic light
 *
 * @class
 * @extends EventEmitter
 */
export default class Light extends EventEmitter {

    /**
     * Constructor
     *
     * @public
     * @constructor
     * @param {Timer} timer Timer
     * @param {Symbol} initStatus Initial status
     * @param {string=} name Name
     */
    constructor(timer, initStatus, name) {
        super();
        this.name = name;
        this.timer = timer;
        this.timer.on('start', () => this.change(this.init(timer.time, initStatus)));
    }

    /**
     * Initialize current status
     * base on time and initial status
     *
     * @public
     * @param {number} time Current time in seconds
     * @param {Symbol} initStatus Initial status
     * @return {number} Delay time for next status
     */
    init(time, initStatus) {
        time = time % TIME_CYCLE;

        let index = 0;
        if (initStatus === STATUS_GREEN) {
            index = 1;
        }

        for (let i = 0; i < 3; i++) {
            let item = cycle[index];
            if (time < item.duration) {
                time = item.duration - time;
                break;
            }
            time -= item.duration;
            index = ++index % 3;
        }

        this.index = index;
        return time;
    }

    /**
     * Change status
     *
     * @public
     * @param {number=} duration Delay time
     */
    change(duration) {
        let item = cycle[this.index];
        let status = this.status = item.status;
        this.emit('change', {time: this.timer.time, status});
        this.timer.delay(this.change.bind(this), duration || item.duration);
        // Point to next status
        this.index = ++this.index % 3;
    }
}
