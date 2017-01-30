/**
 * @file Light spec
 * @author treelite(c.xinle@gmail.com)
 */

import Light from '../lib/Light';
import Timer from '../lib/Timer';
import {
    STATUS_RED, STATUS_YELLOW, STATUS_GREEN,
    DURATION_GREEN, DURATION_RED, DURATION_YELLOW,
    TIME_CYCLE
} from '../lib/status';

const STATUS_INDEX = {
    [STATUS_RED]: 0,
    [STATUS_GREEN]: 1,
    [STATUS_YELLOW]: 2
};

describe('Light', () => {

    let timer;

    beforeEach(() => {
        timer = jasmine.createSpyObj('timer', ['on', 'delay']);
    });

    describe('init by red status, ', () => {

        it('0s should be red', () => {
            let light = new Light(timer);
            let duration = light.init(0, STATUS_RED);
            expect(light.index).toEqual(STATUS_INDEX[STATUS_RED]);
            expect(duration).toEqual(DURATION_RED);
        });

        it('20s should be red and duration should reduce 20s', () => {
            let light = new Light(timer);
            let duration = light.init(20, STATUS_RED);
            expect(light.index).toEqual(STATUS_INDEX[STATUS_RED]);
            expect(duration).toEqual(DURATION_RED - 20);
        });

        it(`${DURATION_RED}s should be green`, () => {
            let light = new Light(timer);
            let duration = light.init(DURATION_RED, STATUS_RED);
            expect(light.index).toEqual(STATUS_INDEX[STATUS_GREEN]);
            expect(duration).toEqual(DURATION_GREEN);
        });

        it(`${DURATION_RED + 20}s should be green and duration should reduce 20s`, () => {
            let light = new Light(timer);
            let duration = light.init(DURATION_RED + 20, STATUS_RED);
            expect(light.index).toEqual(STATUS_INDEX[STATUS_GREEN]);
            expect(duration).toEqual(DURATION_GREEN - 20);
        });

        it(`${DURATION_RED + DURATION_GREEN}s should be yellow`, () => {
            let light = new Light(timer);
            let duration = light.init(DURATION_RED + DURATION_GREEN, STATUS_RED);
            expect(light.index).toEqual(STATUS_INDEX[STATUS_YELLOW]);
            expect(duration).toEqual(DURATION_YELLOW);
        });

        it(`${DURATION_RED + DURATION_GREEN + 9}s should be yellow and duration should reduce 9s`, () => {
            let light = new Light(timer);
            let duration = light.init(DURATION_RED + DURATION_GREEN + 9, STATUS_RED);
            expect(light.index).toEqual(STATUS_INDEX[STATUS_YELLOW]);
            expect(duration).toEqual(DURATION_YELLOW - 9);
        });

        it(`${TIME_CYCLE}s should be the same as 0s`, () => {
            let light = new Light(timer);
            let duration = light.init(TIME_CYCLE, STATUS_RED);
            expect(light.index).toEqual(STATUS_INDEX[STATUS_RED]);
            expect(duration).toEqual(DURATION_RED);
        });

    });


    describe('initial status is green, ', () => {

        it('0s should be green', () => {
            let light = new Light(timer);
            let duration = light.init(0, STATUS_GREEN);
            expect(light.index).toEqual(STATUS_INDEX[STATUS_GREEN]);
            expect(duration).toEqual(DURATION_GREEN);
        });

        it(`${DURATION_GREEN + DURATION_YELLOW}s should be red`, () => {
            let light = new Light(timer);
            let duration = light.init(DURATION_GREEN + DURATION_YELLOW, STATUS_GREEN);
            expect(light.index).toEqual(STATUS_INDEX[STATUS_RED]);
            expect(duration).toEqual(DURATION_RED);
        });

    });

    describe('change status, ', () => {

        it('without initial delay time', () => {
            let light = new Light(timer);
            light.index = STATUS_INDEX[STATUS_RED];
            light.change();
            expect(timer.delay.calls.count()).toEqual(1);
            expect(timer.delay.calls.argsFor(0)[1]).toEqual(DURATION_RED);
        });

        it('with initial delay time', () => {
            let duration = 20;
            let light = new Light(timer);
            light.index = STATUS_INDEX[STATUS_RED];
            light.change(duration);
            expect(timer.delay.calls.count()).toEqual(1);
            expect(timer.delay.calls.argsFor(0)[1]).toEqual(duration);
        });

        it('green is behind red', () => {
            let light = new Light(timer);
            light.index = STATUS_INDEX[STATUS_RED];
            light.change();
            expect(timer.delay.calls.argsFor(0)[1]).toEqual(DURATION_RED);
            expect(light.index).toEqual(STATUS_INDEX[STATUS_GREEN]);
        });

        it('yellow is behind green', () => {
            let light = new Light(timer);
            light.index = STATUS_INDEX[STATUS_GREEN];
            light.change();
            expect(timer.delay.calls.argsFor(0)[1]).toEqual(DURATION_GREEN);
            expect(light.index).toEqual(STATUS_INDEX[STATUS_YELLOW]);
        });

        it('redis behind yellow', () => {
            let light = new Light(timer);
            light.index = STATUS_INDEX[STATUS_YELLOW];
            light.change();
            expect(timer.delay.calls.argsFor(0)[1]).toEqual(DURATION_YELLOW);
            expect(light.index).toEqual(STATUS_INDEX[STATUS_RED]);
        });

    });

});
