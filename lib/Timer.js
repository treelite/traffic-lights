/**
 * @file Simulate timer for node
 * @author treelite(c.xinle@gmail.com)
 */

import EventEmitter from 'events';

/**
 * Day in seconds
 *
 * @const
 * @type {number}
 */
const DAY_IN_SECONDS = 24 * 60 * 60;

/**
 * Simulated timer
 *
 * @class
 * @extends EventEmitter
 */
export default class Timer extends EventEmitter {

    /**
     * Constructor
     *
     * @public
     * @constructor
     * @param {number} duration Duration in seconds
     * @param {number} time Starting time in seconds
     */
    constructor(duration = -1, time = 0) {
        super();
        this.currentTime = time % DAY_IN_SECONDS;
        this.duration = duration;
        this.tasks = [];
    }

    /**
     * Current time in seconds
     *
     * @public
     * @return {number}
     */
    get time() {
        return this.currentTime % DAY_IN_SECONDS;
    }

    /**
     * Start the timer
     *
     * @public
     * @fires Timer#start
     */
    start() {
        this.emit('start');
        this.tick();
    }

    /**
     * Stop the timer
     *
     * @public
     */
    stop() {
        this.duration = 0;
    }

    /**
     * Delay a task
     *
     * @public
     * @param {Function} fn Task
     * @param {number} duration Delay duration in seconds
     */
    delay(fn, duration) {
        this.tasks.push({fn, duration});
    }

    /**
     * Tick
     *
     * @public
     * @fires Timer#end
     */
    tick() {
        // Finish
        if (!this.duration) {
            this.emit('end');
            return;
        }

        this.currentTime++;
        this.duration--;

        let tasks = this.tasks;
        let len = tasks.length;

        for (let i = 0; i < len; i++) {
            let item = tasks[i];
            item.duration--;
            if (!item.duration) {
                item.fn.call(null);
                tasks.splice(i--, 1);
                len--;
            }
        }

        // Next tick
        setImmediate(this.tick.bind(this));
    }
}
