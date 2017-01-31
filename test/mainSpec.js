/**
 * @file Main spec
 * @author treelite(c.xinle@gmail.com)
 */

import Light from '../lib/Light';
import Timer from '../lib/Timer';
import {STATUS_RED, STATUS_YELLOW, STATUS_GREEN} from '../lib/status';

// 11:12 am
let startTime = 11 * 60 * 60 + 12 * 60;
// 30m
let duration = 30 * 60;

describe('Pair lights', () => {

    it('if one is red, the other one must be green or yellow', done => {
        let timer = new Timer(duration, startTime);
        let light1 = new Light(timer, STATUS_RED);
        let light2 = new Light(timer, STATUS_GREEN);

        light1.on('change', e => {
            if (e.status === STATUS_RED) {
                process.nextTick(() => expect(light2.status !== STATUS_RED).toBeTruthy());
            }
        });

        timer.on('end', done);
        timer.start();
    });

    it('if one is green, the other on must be red', done => {
        let timer = new Timer(duration, startTime);
        let light1 = new Light(timer, STATUS_RED);
        let light2 = new Light(timer, STATUS_GREEN);

        light1.on('change', e => {
            if (e.status === STATUS_GREEN) {
                process.nextTick(() => expect(light2.status).toEqual(STATUS_RED));
            }
        });

        timer.on('end', done);
        timer.start();
    });

    it('if one is yellow, the other on must be red', done => {
        let timer = new Timer(duration, startTime);
        let light1 = new Light(timer, STATUS_RED);
        let light2 = new Light(timer, STATUS_GREEN);

        light1.on('change', e => {
            if (e.status === STATUS_YELLOW) {
                process.nextTick(() => expect(light2.status).toEqual(STATUS_RED));
            }
        });

        timer.on('end', done);
        timer.start();
    });

});
