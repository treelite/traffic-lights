/**
 * @file Simulate traffic lights
 * @author treelite(c.xinle@gmail.com)
 */

import Timer from './lib/Timer';
import Light from './lib/Light';
import {parse, format} from './lib/util';
import {STATUS_RED, STATUS_YELLOW, STATUS_GREEN} from './lib/status';

const STATUS_STR_MAP = {
    [STATUS_RED]: 'Red',
    [STATUS_GREEN]: 'Green',
    [STATUS_YELLOW]: 'Yellow'
};

let time = process.argv[2] || '0';
time = parse(time);

let timer = new Timer(30 * 60, time);
let northLight = new Light(timer, STATUS_GREEN, 'North');
let southLight = new Light(timer, STATUS_GREEN, 'South');
let westLight = new Light(timer, STATUS_RED, 'West');
let eastLight = new Light(timer, STATUS_RED, 'East');

function changeHandler(e) {
    console.log(`[${format(e.time)}] ${this.name} is ${STATUS_STR_MAP[e.status]}`);
}

northLight.on('change', changeHandler);
southLight.on('change', changeHandler);
westLight.on('change', changeHandler);
eastLight.on('change', changeHandler);

timer.start();
