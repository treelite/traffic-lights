/**
 * @file Util tools spec
 * @author treelite(c.xinle@gmail.com)
 */

import {parse, format} from '../lib/util';

describe('util.', () => {

    describe('parse, ', () => {

        it('incorrect string should return 0', () => {
            let res = parse('13:23:22:11');
            expect(res).toEqual(0);
        });

        it('seconds', () => {
            let res = parse('123');
            expect(res).toEqual(123);
        });

        it('HH:mm', () => {
            let res = parse('10:21');
            expect(res).toEqual(37260);
        });

        it('HH:mm:ss', () => {
            let res = parse('10:21:12');
            expect(res).toEqual(37272);
        });

    });

    describe('.format, ', () => {
        it('10:00:09', () => {
            let str = format(36009);
            expect(str).toEqual('10:00:09');
        });

        it('over on day', () => {
            let str = format(94327);
            expect(str).toEqual('02:12:07');
        });
    });

});
