# Traffic-lights

Simulates a set of traffic lights at an intersection.

## Run

```sh
# Install dependences
$ npm install

# Run
# Output lights changes in 00:00 - 00:30 by default
$ npm start
# Or specify a start time
$ npm start 09:10

# Run test specs
$ npm test
```

## Interpretation

Implement a simply traffic lights, each light just has one direction, no turning left or right lights. Assume that the north/south light is green and the west/east light is red at midnight.

According to 'The lights will change automatically every 5 minutes', current each colors duration time is as follows:

* `Red` 300s
* `Yellow` 30s
* `Green` 270s

The cycle time is 10 minutes. It's defined in `lib/status.js`, could be changed. Another choice maybe:

* `Red` 150s
* `Yellow` 30s
* `Green` 120s

The cycle time is 5 minutes, it's more quick. :)
