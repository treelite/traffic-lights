/**
 * @file Timer spec
 * @author treelite(c.xinle@gmail.com)
 */

import Timer from '../lib/Timer';

describe('Timer', () => {

    it('start a permanent timer and then stop it', done => {
        let startTime;
        let timer = new Timer();
        timer.on('end', () => {
            expect(startTime).toEqual(0);
            expect(timer.time).toBeGreaterThan(0);
            done();
        });
        timer.on('start', () => startTime = timer.time);
        timer.start();
        setTimeout(() => timer.stop(), 100);
    });

    it('start a limited timer', done => {
        let duration = 20;
        let timer = new Timer(duration);
        timer.on('end', () => {
            expect(timer.time).toEqual(duration);
            done();
        });

        timer.start();
    });

    it('delay task in order', done => {
        let data = [];
        let timer = new Timer(30);

        timer.delay(() => data.push(timer.time), 10);
        timer.delay(
            () => {
                data.push(timer.time);
                timer.delay(() => data.push(timer.time), 3);
                timer.delay(() => data.push(timer.time), 10);
            },
            12
        );
        timer.delay(() => data.push(timer.time), 20);
        timer.on('end', () => {
            expect(data).toEqual([10, 12, 15, 20, 22]);
            done();
        });

        timer.start();
    });

    it('delay can\'t be endless loop', done => {
        let timer = new Timer(50);

        let handler = () => timer.delay(handler, 0);
        timer.delay(handler, 0);
        timer.on('end', done);
        timer.start();
        expect(true).toBeTruthy();
    });

});
